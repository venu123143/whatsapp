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
import { getStream } from '../components/video/UseVideoCustom'
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
    { urls: 'stun:stun.l.stundata.com:3478' }
  ]
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

  // const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)

  const [offer, setOffer] = useState<RTCSessionDescriptionInit | null>(null)
  const [iceCandidate, setIceCandidate] = useState<RTCIceCandidate | null>(null)
  console.log("iceCandidate", iceCandidate);

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
        console.log("ice-candiate-answer", data.candidate);

        await handleICECandidate(data.candidate)
      });
      callSocket.on('call-offer', async (data) => {
        dispatch(setStartCall({ userId: data.from, call: true }))
        setOffer(data.offer)
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
      }
    };
  }, [callSocket])

  console.log("peerConnection", peerConnectionRef.current);
  console.log("localstream", localStream, "remotestream", remoteStream);

  const handleSendOffer = useCallback(async () => {
    try {
      dispatch(setIsLoading(true))
      const stream = await getStream()
      setLocalStream(stream);
      const peerConnection = new RTCPeerConnection(pcConfig);
      peerConnectionRef.current = peerConnection;  // Set the ref

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
      toast.error("Peer connection is null", { position: "top-left" })
    }
  }, [])

  const handleICECandidate = useCallback((candidate: RTCIceCandidate) => {
    const peerConnection = peerConnectionRef.current
    if (peerConnection) {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
    } else {
      toast.error("Peer connection is null", { position: "top-left" })
    }
  }, [])
  const handleEndCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }

    // Stop all tracks in the remote stream
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
      setRemoteStream(null);
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setOffer(null);
    setIceCandidate(null);
    dispatch(setIsCalling(false));
  }
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