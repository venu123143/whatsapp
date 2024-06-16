import { useEffect, createContext, useState } from 'react'
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

export const SocketContext = createContext<Socket>({} as Socket);

const Home = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const { profileOpen } = useSelector((state: RootState) => state.utils)
  const { user } = useSelector((state: RootState) => state.auth)
  const { createGrp, currentUserIndex, friends, users, } = useSelector((state: RootState) => state.msg);
  const [socket, setSocket] = useState({} as Socket)
  const [lstMsg, setLstMsg] = useState<any>(null)

  useEffect(() => {
    const initializeSocket = async () => {
      if (user !== null && !socket.connected) {
        const socket = await createSocket(user);
        setSocket(socket)
      }
    };
    initializeSocket();
  }, [user]);

  let onReload = true;
  useEffect(() => {
    if (socket.connected && user !== null) {
      if (onReload) {
        // socket.emit("get_frnds_on_reload", user)
        socket.emit("get_all_messages", "friends")
        onReload = false
      }

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
  }, [socket])

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
    if (socket.connected) {
      socket.on("recieve_message", (data: ChatMessage) => {
        setLstMsg({ ...data, right: false })
        dispatch(handleRecieveMessage({ ...data, right: false }));
      });
      socket.on("update_view", (data: ChatMessage) => {
        dispatch(handleUpdateSeen(data))
      });

      if (lstMsg !== null) {
        let findUserIndex;
        if (lstMsg.conn_type === "group") {
          findUserIndex = friends.length > 0 ? friends.findIndex((friend: any) => friend.socket_id === lstMsg.recieverId) : -1
        } else {
          findUserIndex = friends.length > 0 ? friends.findIndex((friend: any) => friend.socket_id === lstMsg.senderId) : -1
        }
        if (findUserIndex === -1) {
          const user = users.find((user: CommonProperties) => user.socket_id === lstMsg.senderId);
          if (user) {
            socket.emit("add_friend", user);
            socket.on("get_friends", (friend) => {
              dispatch(handleSetFriends(friend))
            });
          }
        }
        if (friends[0]?.socket_id === lstMsg.senderId && currentUserIndex === 0) {
          dispatch(makeUnreadCountZero())
          socket.emit("update_seen", [lstMsg])
        }
      }
    }
    // Cleanup function to close the socket connection
    return () => {
      if (socket.connected) {
        // socket.disconnect();
        socket.off("recieve_message");
        socket.off("update_view");
        socket.off("get_friends");
      }
    };
  }, [socket, lstMsg]);

  return (
    <>
      <SocketContext.Provider value={socket} >
        <main className='overflow-hidden relative h-screen md:grid grid-cols-10 '>
          <section className={`md:col-span-3 sm:min-w-[300px] w-full ${profileOpen === false ? "overflow-hidden custom-scrollbar" : ""}`}>
            <Users />
          </section>
          <section className={`md:col-span-7 md:static absolute top-0 right-0 w-full transition-all ease-linear duration-150 delay-75 ${currentUserIndex !== null ? "md:translate-x-0 " : "md:translate-x-0 translate-x-[25%]"}`}>
            {currentUserIndex === null ? <DefaultComp /> : <Chat />}
          </section>
          <div>
            <ShowFullImg />
          </div>
        </main>
      </SocketContext.Provider >
    </>
  )
}

export default Home