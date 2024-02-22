import { useEffect, createContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Redux/store'
import Users from '../components/utilities/Users'
import Chat from '../components/utilities/Chat'
import { useNavigate } from 'react-router-dom'
import {
  ChatMessage, getAllGroups, handleSetAllUsersChat,
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
  // console.log(34, friends);

  let onReload = true;
  useEffect(() => {
    // console.log(friends, 36);
    if (socket.connected && user !== null) {
      if (onReload) {

        // socket.emit("get_frnds_on_reload", user)
        socket.emit("get_all_messages", "friends")
        onReload = false
      }
      // console.log(friends, 46);

      socket.on("get_friends", (friends) => {
        dispatch(handleSetFriends(friends))
      })
      socket.on("get_all_messages_on_reload", (friends) => {
        // console.log(friends, 47);

        dispatch(handleSetAllUsersChat(friends))
      })
    }
    return () => {
      if (socket.connected) {
        // socket.off("get_friends");
        socket.off("get_all_messages_on_reload")
      }
    };
  }, [socket])

  useEffect(() => {
    dispatch(getAllGroups())
  }, [createGrp])

  useEffect(() => {
    if (user === null) {
      navigate('/login')
    }
  }, [user])

  // // console.log(friends);

  useEffect(() => {
    // console.log("inside useeffect friends", friends);
    if (socket.connected) {
      // // console.log(friends);
      socket.on("recieve_message", (data: ChatMessage) => {
        // console.log(friends.length);

        const findUserIndex = friends.length > 0 ? friends.findIndex((friend: any) => friend.socket_id === data.senderId) : -1
        if (findUserIndex === -1) {
          // console.log("onrecieve msg -1 ", findUserIndex);

          const user = users.find((user) => user.socket_id === data.senderId);
          if (user) {
            socket.emit("add_friend", user);
            socket.on("get_friends", (friend) => {
              dispatch(handleSetFriends(friend))
            })
          }
        }

        if (friends[0]?.socket_id === data.senderId) {
          socket.emit("update_seen", data)
        }

        dispatch(handleRecieveMessage({ ...data, right: false }));

      });
      socket.on("update_view", (data: ChatMessage) => {
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

export default Home