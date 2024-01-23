import { useEffect, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Redux/store'
import Users from '../components/utilities/Users'
import Chat from '../components/utilities/Chat'
import { useNavigate } from 'react-router-dom'
import { getAllGroups } from '../Redux/reducers/msg/MsgReducer'
import useSocket from '../Redux/reducers/socket/SocketContext'

export const SocketContext = createContext<any>(null);

const Home = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const { profileOpen } = useSelector((state: RootState) => state.utils)
  const { user } = useSelector((state: RootState) => state.auth)
  const { createGrp } = useSelector((state: RootState) => state.msg);

  const socket = useSocket(user);
  socket.on('connect', () => {
    console.log(`${socket.id} is connected `);
  })
  useEffect(() => {
    dispatch(getAllGroups())
    // dispatch(getAllUsers())
    // if (singleGroup != null && singleGroup.socket_id !== undefined && selectedUsersToGroup.length > 0) {
    //   socket?.emit("create_group", singleGroup.socket_id, selectedUsersToGroup)
    // }
  }, [createGrp])
  useEffect(() => {
    if (user === null) {
      navigate('/login')
    }
  })
  return (
    <>
      <SocketContext.Provider value={{ socket }}  >
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