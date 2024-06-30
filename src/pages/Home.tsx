
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
import { UserState } from '../Redux/reducers/Auth/AuthReducer'
import { CallsContext } from '../App'
import VideoCall from '../components/video/VideoCall'
import { RingLoader } from 'react-spinners'
import useVideoCall from "../components/video/UseVideoCustom"
export const SocketContext = createContext<Socket>({} as Socket);

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
  const { localStream, remoteStream, handleSendOffer, handleOffer, handleEndCall, rejectCall } = useVideoCall(callSocket, friends, currentUserIndex);

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
