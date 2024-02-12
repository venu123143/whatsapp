import React, { useEffect, createContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Redux/store'
import Users from '../components/utilities/Users'
import Chat from '../components/utilities/Chat'
import { useNavigate } from 'react-router-dom'
import { getAllGroups, getAllUsers, handleSetFriends } from '../Redux/reducers/msg/MsgReducer'
import { Socket } from 'socket.io-client'
import createSocket from '../Redux/reducers/utils/socket/SocketConnection'
import DefaultComp from '../components/utilities/DefaultComp'

export const SocketContext = createContext<Socket>({} as Socket);

const Home = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const { profileOpen } = useSelector((state: RootState) => state.utils)
  const { user } = useSelector((state: RootState) => state.auth)
  const { createGrp, currentUserIndex } = useSelector((state: RootState) => state.msg);
  const [socket, setSocket] = useState({} as Socket)

  useEffect(() => {
    const initializeSocket = async () => {
      const socket = await createSocket(user);
      
      setSocket(socket)
    };
    initializeSocket();
  }, [user]);

  useEffect(() => {
    if (socket.connected) {
      socket.emit("get_frnds_on_reload", user)
      socket.on("get_friends", (friends) => {
        dispatch(handleSetFriends(friends))
      })
    }
    return () => {
      if (socket.connected) {
        socket.off("get_friends");
      }
    };
  }, [socket, user, dispatch])
  useEffect(() => {
    dispatch(getAllGroups())
    dispatch(getAllUsers())
  }, [createGrp])

  useEffect(() => {
    if (user === null) {
      navigate('/login')
    }
  }, [user])
  return (
    <>
      <SocketContext.Provider value={socket} >
        <main className='w-full grid grid-cols-10 '>
          <section className={`col-span-3 min-w-[300px] ${profileOpen === false ? "overflow-x-hidden custom-scrollbar" : ""}`}>
            <Users />
          </section>
          <section className='col-span-7'>
            {currentUserIndex === null ? <DefaultComp /> : <Chat />}
          </section>
        </main>
      </SocketContext.Provider >
    </>
  )
}

export default React.memo(Home)