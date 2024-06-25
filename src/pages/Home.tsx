
import { useEffect, createContext, useContext, useState, useRef, useCallback, CSSProperties } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Redux/store'
import Users from '../components/utilities/Users'
import Chat from '../components/utilities/Chat'
import { useNavigate } from 'react-router-dom'
import { getAllGroups } from '../Redux/reducers/msg/MsgReducer'
import { Socket } from 'socket.io-client'
import createSocket from '../Redux/reducers/utils/socket/SocketConnection'
import DefaultComp from '../components/utilities/DefaultComp'
import ShowFullImg from '../components/utilities/ShowFullImg'
import { useGetAllMsgs, useRecieveMessage } from '../components/reuse/SocketChat'
import { UserState, setStartCall } from '../Redux/reducers/Auth/AuthReducer'
import { getStream, stopStream } from '../components/video/UseVideoCustom'
import { setIsCalling, setIsLoading } from '../Redux/reducers/Calls/CallsReducer'
import { toast } from 'react-toastify'
import { CallsContext } from '../App'
import VideoCall from '../components/video/VideoCall'
import { RingLoader } from 'react-spinners'

export const SocketContext = createContext<Socket>({} as Socket);

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
const cssOverride: CSSProperties = {
}

const Home = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const { profileOpen } = useSelector((state: RootState) => state.utils)
  const { user } = useSelector((state: RootState) => state.auth)
  const callSocket = useContext(CallsContext)
  const [socket, setSocket] = useState({} as Socket)
  const { createGrp, currentUserIndex, friends, users, } = useSelector((state: RootState) => state.msg);
  const { isCalling, isLoading } = useSelector((state: RootState) => state.calls);
  const [lstMsg, setLstMsg] = useState<any>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)

  const [offer, setOffer] = useState<RTCSessionDescriptionInit | null>(null)
  const [iceCandidate, setIceCandidate] = useState<RTCIceCandidate | null>(null)

  useGetAllMsgs(socket, user as UserState)
  useRecieveMessage(socket, users, lstMsg, setLstMsg, friends, currentUserIndex)

  useEffect(() => {
    const initializeSocket = async () => {
      if (user !== null && !socket.connected) {
        const socket = await createSocket(user, import.meta.env.VITE_API_SOCKET_URL as string);
        setSocket(socket)
      }
    };
    initializeSocket();
  }, [user]);

  useEffect(() => {
    if (user === null) {
      navigate('/login')
    } else {
      dispatch(getAllGroups())
    }
  }, [user, createGrp])

  useEffect(() => {
    console.log(callSocket.connected);
    if (callSocket.connected) {
      callSocket.on('ice-candiate-offer', async (data) => {
        setIceCandidate(data.candidate)
      });
      callSocket.on('ice-candiate-answer', async (data) => {
        await handleICECandidate(data.candidate)
      });
      callSocket.on('call-offer', async (data) => {
        dispatch(setStartCall({ userId: data.from, call: true }))
        setOffer(data.offer)
      });
      callSocket.on('stop-call', async (data) => {
        console.log(data, "stop call");
        dispatch(setStartCall({ userId: data.from, call: false }))
        setOffer(null)
      });
      callSocket.on('call-answer', async (data) => {
        await handleAnswer(data.answer)
      });
    }
    return () => {
      if (socket.connected) {
        callSocket.off('ice-candidate-offer');
        callSocket.off('ice-candidate-answer');
        callSocket.off('call-offer');
        callSocket.off('call-answer');
        callSocket.off('stop-call');
      }
    };
  }, [callSocket])

  const handleSendOffer = useCallback(async () => {
    try {
      dispatch(setIsLoading(true))
      const stream = await getStream()
      setLocalStream(stream);
      const peerConnection = new RTCPeerConnection(pcConfig);
      peerConnectionRef.current = peerConnection;

      stream.getTracks().forEach(track => peerConnectionRef?.current?.addTrack(track, stream));

      peerConnection.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      }
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          callSocket!.emit('ice-candidate-offer', { candidate: event.candidate, to: friends[currentUserIndex].socket_id });
        }
      };
      // Create Offer
      const offer = await peerConnection.createOffer();
      await peerConnectionRef?.current?.setLocalDescription(offer);
      callSocket!.emit('call-offer', { offer, to: friends[currentUserIndex].socket_id });

      dispatch(setIsCalling(true))

    } catch (error: any) {
      dispatch(setIsLoading(false))
      toast.error(error.message, { position: "top-left" })
    }
  }, [callSocket, friends, currentUserIndex, dispatch])

  const handleOffer = useCallback(async () => {
    try {
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
      peerConnection!.addIceCandidate(new RTCIceCandidate(iceCandidate as RTCIceCandidate));

      // await getStream() is having ==> await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const stream = await getStream()
      setLocalStream(stream);
      stream.getTracks().forEach(track => peerConnectionRef?.current?.addTrack(track, stream));
      const answer = await peerConnection.createAnswer();
      await peerConnectionRef.current?.setLocalDescription(answer);
      callSocket!.emit('call-answer', { answer, to: friends[currentUserIndex].socket_id });
      dispatch(setIsCalling(true))
      dispatch(setStartCall({ userId: friends[currentUserIndex]._id, call: false }))

    } catch (error: any) {
      dispatch(setIsLoading(false))
      toast.error(`⬆️ ${error.message}`, { position: "top-left" })
    }
  }, [callSocket, friends, currentUserIndex, offer, iceCandidate, dispatch])

  const handleAnswer = useCallback(async (answer: RTCSessionDescriptionInit) => {
    const peerConnection = peerConnectionRef.current
    if (peerConnection) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
    } else {
      toast.error("Peer connection is null 1", { position: "top-left" })
    }
  }, [])

  const handleICECandidate = useCallback((candidate: RTCIceCandidate) => {
    const peerConnection = peerConnectionRef.current
    if (peerConnection) {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
    } else {
      toast.error("Peer connection is null 2", { position: "top-left" })
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
      remoteStream.getTracks().forEach(track => track.stop());
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

  useEffect(() => {
    const peerConnection = peerConnectionRef.current;
    if (peerConnection) {
      peerConnection.oniceconnectionstatechange = () => {
        console.log(peerConnection.iceConnectionState);
        switch (peerConnection.iceConnectionState) {
          case "checking":
            console.log("Connecting...");
            break;
          case "connected":
            clearTimeout(connectionTimeout); // Clear timeout if connected
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
  }, [peerConnectionRef.current]);

  const connectionTimeout = setTimeout(() => {
    if (peerConnectionRef.current && peerConnectionRef.current.iceConnectionState !== 'connected') {
      callSocket!.emit('stop-call', { to: friends[currentUserIndex]?.socket_id });
      handleEndCall();
      toast.error("Connection timeout. Please try again.", { position: "top-left" });
    }
  }, 30000);

  const rejectCall = () => {
    setOffer(null);
    setIceCandidate(null);
    dispatch(setStartCall({ userId: null, call: false }))
  }

  return (
    <>
      <SocketContext.Provider value={socket} >
        {
          isCalling ?
            <>
              <VideoCall endCall={handleEndCall} localStream={localStream as MediaStream} remoteStream={remoteStream as MediaStream} />
            </>
            :
            (
              <main className='overflow-hidden relative h-screen md:grid grid-cols-10 '>
                <section className={`md:col-span-3 sm:min-w-[300px] w-full ${profileOpen === false ? "overflow-hidden custom-scrollbar" : ""}`}>
                  <Users />
                </section>
                <section className={`md:col-span-7 md:static absolute top-0 right-0 w-full transition-all ease-linear duration-150 delay-75 ${currentUserIndex !== null ? "md:translate-x-0 " : "md:translate-x-0 translate-x-[25%]"}`}>
                  {currentUserIndex === null ? <DefaultComp /> : <Chat rejectCall={rejectCall} handleOffer={handleOffer} handleSendOffer={handleSendOffer} />}
                </section>
                <div>
                  <ShowFullImg />
                </div>
                <div className={`${isLoading === true ? "fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-70 w-full h-screen z-40" : "hidden"} `}>
                  <RingLoader
                    color="#36d7b7"
                    size={500}
                    cssOverride={cssOverride}
                    loading={true}
                    aria-label="Loading Spinner"
                    speedMultiplier={.51}
                    data-testid="loader"
                  />
                </div>
              </main >
            )
        }
      </SocketContext.Provider >
    </>
  )
}

export default Home
