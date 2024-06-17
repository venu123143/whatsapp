import { useEffect, createContext, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Redux/store'
import Users from '../components/utilities/Users'
import Chat from '../components/utilities/Chat'
import { useNavigate } from 'react-router-dom'
import {
  ChatMessage, getAllGroups, handleSetAllUsersChat, makeUnreadCountZero,
  handleRecieveMessage, handleSetFriends, handleUpdateSeen, CommonProperties
} from '../Redux/reducers/msg/MsgReducer'
import { Socket } from 'socket.io-client'
import createSocket from '../Redux/reducers/utils/socket/SocketConnection'
import DefaultComp from '../components/utilities/DefaultComp'
import ShowFullImg from '../components/utilities/ShowFullImg'
import { useGetAllMsgs, useRecieveMessage } from '../components/reuse/SocketChat'
import { UserState, setStartCall } from '../Redux/reducers/Auth/AuthReducer'
import { getStream } from '../components/video/UseVideoCustom'
import { setIsCalling } from '../Redux/reducers/Calls/CallsReducer'
import { toast } from 'react-toastify'
import { CallsContext } from '../App'
import VideoCall from '../components/video/VideoCall'

export const SocketContext = createContext<Socket>({} as Socket);

const pcConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },  // Keep the existing Google STUN server
    { urls: 'stun:stun1.l.google.com:19302' },  // Alternate Google STUN server
    { urls: 'stun:stun.sipgate.net:3478' },    // SIPGATE STUN server
    { urls: 'stun:stun.services.mozilla.com:3478' }, // Mozilla STUN server
  ],
};


const Home = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const { profileOpen } = useSelector((state: RootState) => state.utils)
  const { user } = useSelector((state: RootState) => state.auth)
  const callSocket = useContext(CallsContext)
  const [socket, setSocket] = useState({} as Socket)
  const { createGrp, currentUserIndex, friends, users, } = useSelector((state: RootState) => state.msg);
  const { isCalling } = useSelector((state: RootState) => state.calls);
  const [lstMsg, setLstMsg] = useState<any>(null)
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)

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
    dispatch(getAllGroups()).then(() => {
      if (user === null) {
        navigate('/login')
      }
    })
  }, [createGrp])

  useEffect(() => {
    if (user === null) {
      navigate('/login')
    }
  }, [user])

  useEffect(() => {
    if (callSocket.connected) {
      callSocket.on('ice-candiate', async (data) => {
        console.log(data, "ice")

        await handleICECandidate(data.candidate)
      });
      callSocket.on('call-offer', async (data) => {
        console.log("offcer", data);

        dispatch(setStartCall({ userId: data.userId, call: true }))
        await handleAnswer(data.offer)
      });
      callSocket.on('call-answer', async (data) => {
        console.log("answer", data);

        await handleAnswer(data.answer)
      });
    }
    return () => {
      if (socket.connected) {
        callSocket.off('ice-candiate');
        callSocket.off('call-offer');
        callSocket.off('call-answer');
      }
    };
  }, [socket])

  const handleSendOffer = async () => {
    try {
      const stream = await getStream()
      setLocalStream(stream);
      const peerConnection = new RTCPeerConnection(pcConfig);
      stream.getTracks().forEach(track => peerConnection!.addTrack(track, stream));

      // Create Offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      peerConnection.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      }
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          callSocket!.emit('ice-candidate', { candidate: event.candidate, to: friends[currentUserIndex].socket_id });
        }
      };

      setPeerConnection(peerConnection)
      dispatch(setIsCalling(true))
      callSocket!.emit('call-offer', { offer, to: friends[currentUserIndex].socket_id });

    } catch (error: any) {
      toast.error(error.message, { position: "top-left" })
      console.error('Error accessing media devices:', error);
    }
  };

  const handleOffer = async () => {
    const peerConnection = new RTCPeerConnection(pcConfig);
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        callSocket.emit('ice-candidate', { candidate: event.candidate, to: friends[currentUserIndex].socket_id });
      }
    };
    peerConnection.ontrack = (event) => {
      setRemoteStream(event.streams[0])
    };
    // await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    // await getStream() is having ==> await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const stream = await getStream()
    stream.getTracks().forEach(track => peerConnection!.addTrack(track, stream));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    callSocket!.emit('call-answer', { answer, to: friends[currentUserIndex].socket_id });
    setPeerConnection(peerConnection)
  }

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    await peerConnection!.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleICECandidate = (candidate: RTCIceCandidate) => {
    peerConnection!.addIceCandidate(new RTCIceCandidate(candidate));
  };

  return (
    <>
      <SocketContext.Provider value={socket} >
        {
          isCalling ?
            <>
              <VideoCall localStream={localStream} remoteStream={remoteStream} />
            </>
            :
            (
              <main className='overflow-hidden relative h-screen md:grid grid-cols-10 '>
                <section className={`md:col-span-3 sm:min-w-[300px] w-full ${profileOpen === false ? "overflow-hidden custom-scrollbar" : ""}`}>
                  <Users />
                </section>
                <section className={`md:col-span-7 md:static absolute top-0 right-0 w-full transition-all ease-linear duration-150 delay-75 ${currentUserIndex !== null ? "md:translate-x-0 " : "md:translate-x-0 translate-x-[25%]"}`}>
                  {currentUserIndex === null ? <DefaultComp /> : <Chat handleOffer={handleOffer} handleSendOffer={handleSendOffer} />}
                </section>
                <div>
                  <ShowFullImg />
                </div>
              </main >
            )
        }
      </SocketContext.Provider >
    </>
  )
}

export default Home