import React, { useCallback, SetStateAction } from "react"
import { setIsCalling, setIsLoading } from "../../Redux/reducers/Calls/CallsReducer";
import { AppDispatch } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { getStream, stopStream } from "./UseVideoCustom";
import { pcConfig } from "../../static/Static"
import { toast } from 'react-toastify'
import { ConnectionResult } from "../../Redux/reducers/msg/MsgReducer";
import { Socket } from "socket.io-client";
import { setStartCall } from "../../Redux/reducers/Auth/AuthReducer";

interface UseVideoParams {
    callSocket: Socket<any>;
    friends: ConnectionResult[];
    currentUserIndex: number;
    setCallStarted: React.Dispatch<SetStateAction<boolean>>;
    incomingCallSound: React.MutableRefObject<HTMLAudioElement>;
    offer: RTCSessionDescriptionInit | null;
    iceCandidate: RTCIceCandidate | null;
    setLocalStream: React.Dispatch<SetStateAction<MediaStream | null>>;
    setRemoteStream: React.Dispatch<SetStateAction<MediaStream | null>>;
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    setOffer: React.Dispatch<SetStateAction<RTCSessionDescriptionInit | null>>;
    setIceCandidate: React.Dispatch<SetStateAction<RTCIceCandidate | null>>;
    peerConnectionRef: React.MutableRefObject<RTCPeerConnection | null>;
    setDataChannel: React.Dispatch<React.SetStateAction<RTCDataChannel | null>>
    handleDataChannelMessage: (event: MessageEvent) => void
    handleDataChannelOpen: () => void
    handleDataChannelClose: () => void
    // (event: MessageEvent) => void
}

const useVideo = ({ callSocket, friends, currentUserIndex, setCallStarted, incomingCallSound, remoteStream, setIceCandidate, handleDataChannelClose, setDataChannel,
    offer, setOffer, iceCandidate, setLocalStream, localStream, setRemoteStream, peerConnectionRef, handleDataChannelMessage, handleDataChannelOpen, }: UseVideoParams) => {
    const dispatch: AppDispatch = useDispatch()
    const handleSendOffer = useCallback(async () => {
        try {
            dispatch(setIsLoading(true))
            setCallStarted(true);

            const stream = await getStream()
            setLocalStream(stream);
            const peerConnection = new RTCPeerConnection(pcConfig);
            peerConnectionRef.current = peerConnection;

            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

            peerConnection.ontrack = (event) => {
                setRemoteStream(event.streams[0]);
            }
            peerConnection.onicecandidate = (event) => {
                console.log(event.candidate);
                
                if (event.candidate) {
                    callSocket.emit('ice-candidate-offer', { candidate: event.candidate, to: friends[currentUserIndex].room_id });
                }
            };
            const dataChannel = peerConnection.createDataChannel("chat");
            dataChannel.onopen = handleDataChannelOpen;
            dataChannel.onmessage = handleDataChannelMessage;
            dataChannel.onclose = handleDataChannelClose;

            setDataChannel(dataChannel);
            // Create Offer
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            callSocket.emit('call-offer', { offer, to: friends[currentUserIndex].room_id });

            dispatch(setIsCalling(true))

        } catch (error: any) {
            if (localStream) {
                stopStream(localStream as MediaStream)
                setLocalStream(null);
            }
            if (peerConnectionRef.current) {
                peerConnectionRef?.current?.close()
            }
            setCallStarted(false);
            dispatch(setIsLoading(false))
            toast.error(error.message, { position: "top-left" })
        }
    }, [callSocket, friends, currentUserIndex, dispatch])

    const handleOffer = useCallback(async () => {
        try {
            setCallStarted(true);
            dispatch(setIsLoading(true))
            const peerConnection = new RTCPeerConnection(pcConfig);
            peerConnectionRef.current = peerConnection;
            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    callSocket.emit('ice-candidate-answer', { candidate: event.candidate, to: friends[currentUserIndex].room_id });
                }
            };
            peerConnection.ontrack = (event) => {
                setRemoteStream(event.streams[0])
            };

            peerConnection.ondatachannel = (event) => {
                const dataChannel = event.channel;
                dataChannel.onopen = handleDataChannelOpen;
                dataChannel.onmessage = handleDataChannelMessage;
                dataChannel.onclose = handleDataChannelClose;

                setDataChannel(dataChannel); // Store the data channel
            };
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer as RTCSessionDescriptionInit));
            // if (iceCandidate) {
            console.log(iceCandidate);
            
            peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate as RTCIceCandidate));
            // }

            // await getStream() is having ==> await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            const stream = await getStream()
            setLocalStream(stream);
            stream.getTracks().forEach(track => peerConnectionRef?.current?.addTrack(track, stream));
            const answer = await peerConnection.createAnswer();
            await peerConnectionRef.current?.setLocalDescription(answer);
            callSocket.emit('call-answer', { answer, to: friends[currentUserIndex].room_id });
            dispatch(setIsCalling(true))
            dispatch(setStartCall({ userId: friends[currentUserIndex].room_id, call: false }))
            incomingCallSound.current.pause();
            incomingCallSound.current.currentTime = 0;
        } catch (error: any) {
            if (localStream) {
                stopStream(localStream as MediaStream)
                setLocalStream(null);
            }
            if (peerConnectionRef.current) {
                peerConnectionRef?.current?.close()
            }
            incomingCallSound.current.pause();
            incomingCallSound.current.currentTime = 0;
            setCallStarted(false);
            dispatch(setIsLoading(false))
            toast.error(`⬆️ ${error.message}`, { position: "top-left" })
        }
    }, [callSocket, friends, currentUserIndex, offer, iceCandidate, dispatch])

    const handleAnswer = useCallback(async (answer: RTCSessionDescriptionInit) => {
        const peerConnection = peerConnectionRef.current
        if (peerConnection) {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
        } else {
            console.log('peer connection itself null.');

            toast.error("Peer connection is null 1", { position: "top-left" })
        }
    }, [])

    const handleICECandidate = useCallback((candidate: RTCIceCandidate) => {
        const peerConnection = peerConnectionRef.current
        if (peerConnection && candidate.candidate) {
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).then(() => {
                console.log('ICE candidate added successfully')
            }).catch((error) => {
                console.error('Error adding ICE candidate:', error)
            })
        } else {
            toast.error(`😔 peer connection itself null`, { position: "top-left" })
        }
    }, [])

    const handleEndCall = () => {
        if (localStream) {
            stopStream(localStream as MediaStream)
            setLocalStream(null);
        }

        // Stop all tracks in the remote stream
        if (remoteStream) {
            stopStream(remoteStream as MediaStream)
            setRemoteStream(null);
        }
        if (peerConnectionRef.current) {
            peerConnectionRef.current.ontrack = null;
            peerConnectionRef.current.onicecandidate = null;
            peerConnectionRef.current.oniceconnectionstatechange = null;
            peerConnectionRef.current.onicecandidateerror = null;
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
        setOffer(null);
        setIceCandidate(null);
        dispatch(setIsCalling(false));
    }

    return {
        handleSendOffer,
        handleOffer,
        handleAnswer,
        handleICECandidate,
        handleEndCall
    }
}

export default useVideo