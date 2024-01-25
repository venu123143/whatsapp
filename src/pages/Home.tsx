import { useEffect, createContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Redux/store'
import Users from '../components/utilities/Users'
import Chat from '../components/utilities/Chat'
import { useNavigate } from 'react-router-dom'
import { getAllGroups } from '../Redux/reducers/msg/MsgReducer'

import { Socket } from 'socket.io-client'
import createSocket from '../Redux/reducers/utils/socket/SocketConnection'

export const SocketContext = createContext<Socket>({} as Socket);

const Home = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const { profileOpen } = useSelector((state: RootState) => state.utils)
  const { user } = useSelector((state: RootState) => state.auth)
  const { createGrp } = useSelector((state: RootState) => state.msg);
  const [socket, setSocket] = useState({} as Socket)
  useEffect(() => {
    const initializeSocket = async () => {
      const socket = await createSocket(user);
      setSocket(socket)
    };
    initializeSocket();
  }, [user]);
  useEffect(() => {
    dispatch(getAllGroups())
  }, [createGrp])

  useEffect(() => {
    if (user === null) {
      navigate('/login')
    }
  })
  return (
    <>
      <SocketContext.Provider value={socket} >
        <main className='w-full grid grid-cols-10 '>
          <section className={`col-span-3 min-w-[300px] ${profileOpen === false ? "overflow-hidden" : ""}`}>
            <Users />
          </section>
          <section className='col-span-7'>
            <Chat />
          </section>
        </main>
      </SocketContext.Provider >
    </>
  )
}

export default Home