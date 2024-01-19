// import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Redux/store'
import Users from '../components/utilities/Users'
import Chat from '../components/utilities/Chat'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllGroups, getAllUsers } from '../Redux/reducers/msg/MsgReducer'
import { SocketContext } from "../Redux/reducers/socket/SocketContext"

const Home = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const { profileOpen } = useSelector((state: RootState) => state.utils)
  const { user, isLoading, isError, isSuccess } = useSelector((state: RootState) => state.auth)
  const { createGrp, selectedUsersToGroup, singleGroup } = useSelector((state: RootState) => state.msg);
  const { socket } = useContext(SocketContext)
  // console.log(createGrp, selectedUsersToGroup, singleGroup?.socket_id);
  socket?.on('connect', () => {
    console.log(`${socket.id} is connected`);
  })
  useEffect(() => {
    dispatch(getAllGroups())
    // dispatch(getAllUsers())
    if (singleGroup != null && singleGroup.socket_id !== undefined && selectedUsersToGroup.length > 0) {
      socket?.emit("create_group", singleGroup.socket_id, selectedUsersToGroup)
    }
  }, [createGrp])
  useEffect(() => {
    if (user === null) {
      socket?.emit("user_login", user)
      navigate('/login')
    }
  }, [user, isLoading, isError, isSuccess])
  return (
    <>
      <main className='w-full grid grid-cols-10 '>
        <section className={`col-span-3 min-w-[300px] ${profileOpen === false ? "overflow-hidden" : ""}`}>
          <Users />
        </section>
        <section className='col-span-7'>
          <Chat />
        </section>

      </main>

    </>
  )
}

export default Home