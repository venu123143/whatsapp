import React, { useCallback, SetStateAction } from "react"
import { setIsCalling, setIsLoading } from "../../Redux/reducers/Calls/CallsReducer";
import { AppDispatch } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { getStream, stopStream } from "./UseVideoCustom";
import { pcConfig } from "../../static/Static"
import { toast } from 'react-toastify'
import { CommonProperties } from "../../Redux/reducers/msg/MsgReducer";
import { Socket } from "socket.io-client";
import { setStartCall } from "../../Redux/reducers/Auth/AuthReducer";

interface UseVideoParams {
    callSocket: Socket<any>;
    friends: CommonProperties[];
    currentUserIndex: number;
    setCallStarted: React.Dispatch<SetStateAction<boolean>>;
    incomingCallSound: React.MutableRefObject<HTMLAudioElement>;
    offer: RTCSessionDescriptionInit | null;
    iceCandidate: RTCIceCandidate | null;
    setLocalStream: React.Dispatch<SetStateAction<MediaStream | null>>;
    localStream: MediaStream | null;
    setRemoteStream: React.Dispatch<SetStateAction<MediaStream | null>>;
    peerConnectionRef: React.MutableRefObject<RTCPeerConnection | null>
}

const useVideo = ({ callSocket, friends, currentUserIndex, setCallStarted, incomingCallSound,
    offer, iceCandidate, setLocalStream, localStream, setRemoteStream, peerConnectionRef }: UseVideoParams) => {
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
                if (event.candidate) {
                    callSocket.emit('ice-candidate-offer', { candidate: event.candidate, to: friends[currentUserIndex].socket_id });
                }
            };
            // Create Offer
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            callSocket.emit('call-offer', { offer, to: friends[currentUserIndex].socket_id });

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
                    callSocket.emit('ice-candidate-answer', { candidate: event.candidate, to: friends[currentUserIndex].socket_id });
                }
            };
            peerConnection.ontrack = (event) => {
                setRemoteStream(event.streams[0])
            };
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer as RTCSessionDescriptionInit));
            peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate as RTCIceCandidate));

            // await getStream() is having ==> await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            const stream = await getStream()
            setLocalStream(stream);
            stream.getTracks().forEach(track => peerConnectionRef?.current?.addTrack(track, stream));
            const answer = await peerConnection.createAnswer();
            await peerConnectionRef.current?.setLocalDescription(answer);
            callSocket.emit('call-answer', { answer, to: friends[currentUserIndex].socket_id });
            dispatch(setIsCalling(true))
            dispatch(setStartCall({ userId: friends[currentUserIndex]._id, call: false }))
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

    return {
        handleSendOffer,
        handleOffer
    }
}

export default useVideo