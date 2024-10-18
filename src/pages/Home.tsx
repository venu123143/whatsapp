
import { useEffect, useContext, useState, useRef, CSSProperties } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Redux/store'
import Users from '../components/utilities/Users'
import Chat from '../components/utilities/Chat'
import { useNavigate } from 'react-router-dom'
// import { getAllGroups } from '../Redux/reducers/msg/MsgReducer'
import DefaultComp from '../components/utilities/DefaultComp'
import { useGetAllMsgs, useRecieveMessage } from '../components/reuse/SocketChat'
import { UserState, setStartCall } from '../Redux/reducers/Auth/AuthReducer'
import { toast } from 'react-toastify'
import { CallsContext } from '../App'
import VideoCall from '../components/video/VideoCall'
import { RingLoader } from 'react-spinners'
import IncommingCall from "../static/incomming_call.wav"
import useVideo from "../components/video/UseVideo"
import { Message } from "../components/interfaces/CallInterface"
import { SocketContext } from "../App"
import ImageModal from '../components/reuse/ImgModel'
import { setIsFullscreen } from '../Redux/reducers/utils/Features';
import EditMsg from '../components/cards/EditMsg'
import DeleteMsg from '../components/cards/DeleteMsg'

const cssOverride: CSSProperties = {
}

const Home = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [callStarted, setCallStarted] = useState(false); // incomming-call
  const { profileOpen } = useSelector((state: RootState) => state.utils)
  const { user } = useSelector((state: RootState) => state.auth)
  const callSocket = useContext(CallsContext)
  const socket = useContext(SocketContext)


  // const [socket, setSocket] = useState({} as Socket)
  const { createGrp, currentUserIndex, friends, editMessage } = useSelector((state: RootState) => state.msg);
  const { isCalling, isLoading } = useSelector((state: RootState) => state.calls);
  const { currentImage } = useSelector((state: RootState) => state.features);
  // const [lstMsg, setLstMsg] = useState<any>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const incomingCallSound = useRef(new Audio(IncommingCall));

  const connectionTimeout = useRef<any>();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null)
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFrontCamera, setIsFrontCamera] = useState(true); // Track the current camera

  const [offer, setOffer] = useState<RTCSessionDescriptionInit | null>(null)
  const [iceCandidate, setIceCandidate] = useState<RTCIceCandidate | null>(null)

  useGetAllMsgs(socket, user as UserState)
  useRecieveMessage(socket, friends, currentUserIndex)
  useEffect(() => {
    if (user === null) {
      navigate('/login')
    } else {
      if (friends.length > 0) {
        const onetotone = friends.filter((friend) => friend.conn_type === "onetoone").map((each) => each.room_id)
        callSocket.emit('join_room', onetotone, (ack: any) => {
          toast.info(ack.message)
        })
      }
      // dispatch(getAllGroups())
    }
  }, [user, createGrp, friends])

  const handleDataChannelOpen = () => {
    console.log('Data channel is open');
    setMessages([])
  };

  const handleDataChannelMessage = (event: MessageEvent) => {
    const message = event.data;
    setMessages(prev => [...prev, { sender: 'remote', content: message }]);
  };

  const handleDataChannelClose = () => {
    console.log('Data channel is closed');
    setMessages([])
    // setRemoteStream(null)
  };

  const { handleSendOffer, handleOffer, handleICECandidate, handleAnswer, handleEndCall } = useVideo({
    callSocket, friends, incomingCallSound, setIceCandidate, setOffer, handleDataChannelMessage,
    currentUserIndex, setCallStarted, offer, iceCandidate, remoteStream, handleDataChannelOpen,
    localStream, setLocalStream, setRemoteStream, peerConnectionRef, setDataChannel, handleDataChannelClose
  })

  useEffect(() => {
    if (callSocket.connected) {
      callSocket.on('ice-candidate-offer', (data) => {
        setIceCandidate(data.candidate)
      });
      callSocket.on('ice-candidate-answer', async (data) => {
        await handleICECandidate(data.candidate)
      });
      callSocket.on('call-offer', async (data) => {
        console.log(data);

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


  // In your peer connection setup (e.g., in handleSendOffer or handleOffer)

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

  const sendMessage = (message: string) => {
    if (dataChannel && dataChannel.readyState === "open") {
      dataChannel.send(message);
      setMessages(prev => [...prev, { sender: 'local', content: message }]);
      // Update your UI to display the sent message
    } else {
      toast.error('Data channel is not open', { position: 'top-left' })
    }
  };
  useEffect(() => {
    if (callStarted) {
      connectionTimeout.current = setTimeout(() => {
        if (peerConnectionRef.current?.iceConnectionState !== 'connected') {
          handleEndCall();
          callSocket.emit('stop-call', { to: friends[currentUserIndex]?.room_id });
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
  const handleCameraFlip = async () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: isFrontCamera ? 'environment' : 'user' },
        audio: true,
      });

      // Replace the local stream with the new one
      if (peerConnectionRef.current) {
        const senders = peerConnectionRef.current.getSenders();
        const videoSender = senders.find(sender => sender.track?.kind === 'video');
        if (videoSender) {
          videoSender.replaceTrack(newStream.getVideoTracks()[0]);
        }
      }

      setLocalStream(newStream);
      setIsFrontCamera(!isFrontCamera); // Toggle camera state
    }
  };

  const closeModal = () => {
    dispatch(setIsFullscreen(false))
  };

  return (
    <>
      {
        isCalling ?
          <>
            <VideoCall sendMessage={sendMessage} messages={messages} isFrontCamera={isFrontCamera} handleCameraFlip={handleCameraFlip}
              endCall={handleEndCall} localStream={localStream as MediaStream} remoteStream={remoteStream as MediaStream} />
          </>
          :
          (
            <main className='overflow-hidden relative h-screen md:grid grid-cols-10 '>
              <section className={`md:col-span-3 sm:min-w-[300px] w-full ${profileOpen === false ? "overflow-hidden custom-scrollbar" : ""}`}>
                <Users />
              </section>
              <section className={`md:col-span-7 md:static h-screen absolute top-0 right-0 w-full transition-all ease-linear duration-150 delay-75 ${currentUserIndex !== null ? "md:translate-x-0 " : "md:translate-x-0 translate-x-[25%]"}`}>
                {currentUserIndex === null ? <DefaultComp /> : <Chat rejectCall={rejectCall} handleOffer={handleOffer} handleSendOffer={handleSendOffer} />}
              </section>
              <div>
                <ImageModal
                  imageUrl={currentImage}
                  onClose={closeModal}
                />
              </div>
              <EditMsg message={editMessage} />
              <DeleteMsg message={editMessage} />

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
    </>
  )
}

export default Home
