
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
import { stopStream } from '../components/video/UseVideoCustom'
import { setIsCalling } from '../Redux/reducers/Calls/CallsReducer'
import { toast } from 'react-toastify'
import { CallsContext } from '../App'
import VideoCall from '../components/video/VideoCall'
import { RingLoader } from 'react-spinners'
import IncommingCall from "../static/incomming_call.wav"
import useVideo from "../components/video/UseVideo"

export const SocketContext = createContext<Socket>({} as Socket);

const cssOverride: CSSProperties = {
}

const Home = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [callStarted, setCallStarted] = useState(false);
  const { profileOpen } = useSelector((state: RootState) => state.utils)
  const { user } = useSelector((state: RootState) => state.auth)
  const callSocket = useContext(CallsContext)
  const [socket, setSocket] = useState({} as Socket)
  const { createGrp, currentUserIndex, friends, users, } = useSelector((state: RootState) => state.msg);
  const { isCalling, isLoading } = useSelector((state: RootState) => state.calls);
  const [lstMsg, setLstMsg] = useState<any>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const incomingCallSound = useRef(new Audio(IncommingCall));



  const connectionTimeout = useRef<any>();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)

  const [offer, setOffer] = useState<RTCSessionDescriptionInit | null>(null)
  const [iceCandidate, setIceCandidate] = useState<RTCIceCandidate | null>(null)

  useGetAllMsgs(socket, user as UserState)
  useRecieveMessage(socket, users, lstMsg, setLstMsg, friends, currentUserIndex)
  useEffect(() => {
    if (user === null) {
      navigate('/login')
    } else {
      dispatch(getAllGroups())
    }
  }, [user, createGrp])

  useEffect(() => {
    const initializeSocket = async () => {
      if (user !== null && !socket.connected) {
        const socket = await createSocket(user, import.meta.env.VITE_API_SOCKET_URL as string);
        setSocket(socket)
      }
    };
    initializeSocket();
  }, [user]);
    
  const { handleSendOffer, handleOffer, handleICECandidate, handleAnswer, handleEndCall } = useVideo({
    callSocket, friends, incomingCallSound, setIceCandidate, setOffer,
    currentUserIndex, setCallStarted, offer, iceCandidate, remoteStream,
    localStream, setLocalStream, setRemoteStream, peerConnectionRef
  })


  useEffect(() => {
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
        // Play the incoming call sound
        incomingCallSound.current.loop = true;
        incomingCallSound.current.play();
      });
      callSocket.on('stop-call', async (data) => {
        dispatch(setStartCall({ userId: data.from, call: false }))
        incomingCallSound.current.pause();
        incomingCallSound.current.currentTime = 0;
        setOffer(null)
      });
      callSocket.on('call-answer', async (data) => {
        incomingCallSound.current.pause();
        incomingCallSound.current.currentTime = 0;
        await handleAnswer(data.answer)
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
  }, [callSocket])





  useEffect(() => {
    const peerConnection = peerConnectionRef.current;
    if (peerConnection) {
      peerConnection.oniceconnectionstatechange = () => {
        switch (peerConnection.iceConnectionState) {
          case "checking":
            console.log("Connecting...");
            break;
          case "connected":
            setCallStarted(false);
            clearTimeout(connectionTimeout.current); // Clear timeout if connected
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


  useEffect(() => {
    if (callStarted) {
      connectionTimeout.current = setTimeout(() => {
        if (peerConnectionRef.current?.iceConnectionState !== 'connected') {
          handleEndCall();
          callSocket.emit('stop-call', { to: friends[currentUserIndex]?.socket_id });
          toast.error("Connection timeout. Please try again.", { position: "top-left" });
        }
      }, 30000);
    }

    return () => {
      if (connectionTimeout.current) {
        clearTimeout(connectionTimeout.current);
      }
    };
  }, [callStarted]);
  const rejectCall = () => {
    setOffer(null);
    setIceCandidate(null);
    dispatch(setStartCall({ userId: null, call: false }))
    incomingCallSound.current.pause();
    incomingCallSound.current.currentTime = 0;
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
