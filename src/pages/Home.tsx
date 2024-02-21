import React, { useEffect, createContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Redux/store'
import Users from '../components/utilities/Users'
import Chat from '../components/utilities/Chat'
import { useNavigate } from 'react-router-dom'
import {
  ChatMessage, getAllGroups, getAllUsers, handleSetAllUsersChat,
  handleRecieveMessage, handleSetFriends, handleUpdateSeen
} from '../Redux/reducers/msg/MsgReducer'
import { Socket } from 'socket.io-client'
import createSocket from '../Redux/reducers/utils/socket/SocketConnection'
import DefaultComp from '../components/utilities/DefaultComp'

export const SocketContext = createContext<Socket>({} as Socket);

const Home = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const { profileOpen } = useSelector((state: RootState) => state.utils)
  const { user } = useSelector((state: RootState) => state.auth)
  const { createGrp, currentUserIndex, friends, users, } = useSelector((state: RootState) => state.msg);
  const [socket, setSocket] = useState({} as Socket)

  useEffect(() => {
    const initializeSocket = async () => {
      if (user !== null) {
        const socket = await createSocket(user);
        setSocket(socket)
      }
    };
    initializeSocket();
  }, [user]);
  useEffect(() => {
    if (socket.connected && user !== null) {
      socket.emit("get_frnds_on_reload", user)
      socket.emit("get_all_messages", "friends")

      socket.on("get_friends", (friends) => {
        dispatch(handleSetFriends(friends))
      })
      socket.on("get_all_messages_on_reload", (friends) => {
        dispatch(handleSetAllUsersChat(friends))
      })
    }
    return () => {
      if (socket.connected) {
        socket.off("get_friends");
        socket.off("get_all_messages_on_reload")
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

  useEffect(() => {
    if (socket.connected) {
      socket.on("recieve_message", (data: ChatMessage) => {

        const findUserIndex = friends.length > 0 ? friends.findIndex((friend: any) => friend.socket_id === data.senderId) : -1
        if (findUserIndex === -1) {
          console.log("if -1", friends);

          const user = users.find((user) => user.socket_id === data.senderId);
          if (user) {
            socket.emit("add_friend", user);
            socket.on("get_friends", (friends) => {
              dispatch(handleSetFriends(friends))
            })
          }
        }
        console.log(findUserIndex, data);

        // console.log(findUserIndex, 79);
        // console.log(data.senderId, 80);
        // console.log(friends[0]?.socket_id, 81);

        if (friends[0]?.socket_id === data.senderId) {
          console.log("sending seen From Home 80");

          socket.emit("update_seen", { ...data, right: false })
        }

        dispatch(handleRecieveMessage({ ...data, right: false }));
      });
      socket.on("update_view", (data: ChatMessage) => {
        console.log("when recive seen", data)
        dispatch(handleUpdateSeen(data))
      })
    }
  }, [socket])
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
          {/* <section className={`${isCurrentLoading === true ? "block shadow-lg bg-black bg-opacity-70 w-full h-full m-auto" : "hidden"} cursor-pointer group-hover:block absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 items-center`}>
            {
              isCurrentLoading &&
              <RingLoader
                color="#36d7b7"
                loading={isCurrentLoading}
                aria-label="Loading Spinner"
                speedMultiplier={1}
                data-testid="loader"
                size={500}
                className='m-auto'
              />
            }

          </section> */}
        </main>
      </SocketContext.Provider >
    </>
  )
}

export default React.memo(Home)