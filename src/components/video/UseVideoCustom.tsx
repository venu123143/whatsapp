import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { getStream, stopStream } from '../../components/video/CustomFunc';
import { toast } from 'react-toastify';
import { setIsCalling, setIsLoading } from '../../Redux/reducers/Calls/CallsReducer';
import { setStartCall } from '../../Redux/reducers/Auth/AuthReducer';
import { CommonProperties } from '../../Redux/reducers/msg/MsgReducer';
import { Socket } from 'socket.io-client';

const pcConfig = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun.l.stundata.com:3478' },
        { urls: 'stun:openrelay.metered.ca:80' },
        { urls: 'stun:openrelay.metered.ca:443' },
        { urls: 'stun:openrelay.metered.ca:5349' },
    ],
    iceCandidatePoolSize: 10
};

const useVideoCustom = (callSocket: Socket, friends: CommonProperties[], currentUserIndex: number) => {
    const dispatch: AppDispatch = useDispatch();
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [offer, setOffer] = useState<RTCSessionDescriptionInit | null>(null);
    const [iceCandidate, setIceCandidate] = useState<RTCIceCandidate | null>(null);

    useEffect(() => {
        if (callSocket.connected) {
            callSocket.on('ice-candiate-offer', async (data) => {
                setIceCandidate(data.candidate);
            });
            callSocket.on('ice-candiate-answer', async (data) => {
                await handleICECandidate(data.candidate);
            });
            callSocket.on('call-offer', async (data) => {
                dispatch(setStartCall({ userId: data.from, call: true }));
                setOffer(data.offer);
            });
            callSocket.on('stop-call', async (data) => {
                dispatch(setStartCall({ userId: data.from, call: false }));
                setOffer(null);
            });
            callSocket.on('call-answer', async (data) => {
                await handleAnswer(data.answer);
            });
        }
        return () => {
            if (callSocket.connected) {
                callSocket.off('ice-candidate-offer');
                callSocket.off('ice-candidate-answer');
                callSocket.off('call-offer');
                callSocket.off('call-answer');
                callSocket.off('stop-call');
            }
        };
    }, [callSocket]);

    const handleSendOffer = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const stream = await getStream();
            setLocalStream(stream);
            const peerConnection = new RTCPeerConnection(pcConfig);
            peerConnectionRef.current = peerConnection;

            stream.getTracks().forEach(track => peerConnectionRef.current?.addTrack(track, stream));

            peerConnection.ontrack = (event) => {
                setRemoteStream(event.streams[0]);
            };
            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    callSocket.emit('ice-candidate-offer', { candidate: event.candidate, to: friends[currentUserIndex].socket_id });
                }
            };

            const offer = await peerConnection.createOffer();
            await peerConnectionRef.current?.setLocalDescription(offer);
            callSocket.emit('call-offer', { offer, to: friends[currentUserIndex].socket_id });

            dispatch(setIsCalling(true));

        } catch (error: any) {
            dispatch(setIsLoading(false));
            toast.error(error.message, { position: "top-left" });
        }
    }, [callSocket, friends, currentUserIndex, dispatch]);

    const handleOffer = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            const peerConnection = new RTCPeerConnection(pcConfig);
            peerConnectionRef.current = peerConnection;
            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    callSocket.emit('ice-candidate-answer', { candidate: event.candidate, to: friends[currentUserIndex].socket_id });
                }
            };
            peerConnection.ontrack = (event) => {
                setRemoteStream(event.streams[0]);
            };
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer as RTCSessionDescriptionInit));
            peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate as RTCIceCandidate));

            const stream = await getStream();
            setLocalStream(stream);
            stream.getTracks().forEach(track => peerConnectionRef.current?.addTrack(track, stream));
            const answer = await peerConnection.createAnswer();
            await peerConnectionRef.current?.setLocalDescription(answer);
            callSocket.emit('call-answer', { answer, to: friends[currentUserIndex].socket_id });
            dispatch(setIsCalling(true));
            dispatch(setStartCall({ userId: friends[currentUserIndex]._id, call: false }));

        } catch (error: any) {
            dispatch(setIsLoading(false));
            toast.error(`⬆️ ${error.message}`, { position: "top-left" });
        }
    }, [callSocket, friends, currentUserIndex, offer, iceCandidate, dispatch]);

    const handleAnswer = useCallback(async (answer: RTCSessionDescriptionInit) => {
        const peerConnection = peerConnectionRef.current;
        if (peerConnection) {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        } else {
            toast.error("Peer connection is null", { position: "top-left" });
        }
    }, []);

    const handleICECandidate = useCallback((candidate: RTCIceCandidate) => {
        const peerConnection = peerConnectionRef.current;
        if (peerConnection) {
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } else {
            toast.error("Peer connection is null", { position: "top-left" });
        }
    }, []);

    const handleEndCall = () => {
        if (localStream) {
            stopStream(localStream);
            setLocalStream(null);
        }

        if (remoteStream) {
            stopStream(remoteStream);
            remoteStream.getTracks().forEach(track => track.stop());
            setRemoteStream(null);
        }
        if (peerConnectionRef.current) {
            peerConnectionRef.current.ontrack = null;
            peerConnectionRef.current.onicecandidate = null;
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
        setOffer(null);
        setIceCandidate(null);
        dispatch(setIsCalling(false));
    };

    const rejectCall = () => {
        setOffer(null);
        setIceCandidate(null);
        dispatch(setStartCall({ userId: null, call: false }))
    }

    useEffect(() => {
        const peerConnection = peerConnectionRef.current;
        if (peerConnection) {
            peerConnection.oniceconnectionstatechange = () => {
                switch (peerConnection.iceConnectionState) {
                    case "checking":
                        console.log("Connecting...");
                        break;
                    case "connected":
                        clearTimeout(connectionTimeout);
                        break;
                    case "failed":
                        peerConnection.restartIce();
                        break;
                }
            };
            peerConnection.onicecandidateerror = (event) => {
                console.error('ICE candidate error:', event);
            };
        }
    }, []);

    const connectionTimeout = setTimeout(() => {
        if (peerConnectionRef.current && peerConnectionRef.current.iceConnectionState !== 'connected') {
            callSocket.emit('stop-call', { to: friends[currentUserIndex]?.socket_id });
            handleEndCall();
            toast.error("Connection timeout. Please try again.", { position: "top-left" });
        }
    }, 30000);

    return {
        localStream,
        remoteStream,
        handleSendOffer,
        handleOffer,
        handleEndCall,
        rejectCall
    };
};

export default useVideoCustom;
