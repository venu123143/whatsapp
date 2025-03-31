
import React, { useContext } from 'react'
import Profile from './Profile'
import UserCard from '../cards/UserCard'
import ProfileHeader from './ProfileHeader'
import SearchBar from './SearchBar'
import ContactsList from '../../pages/Contacts'
import CreateContact from './CreateContact'
import { AppDispatch, RootState } from '../../Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import CreateGroup from '../../pages/CreateGroup'
import { handleSetStatus, setCurrentGrpOrUser, ConnectionResult } from '../../Redux/reducers/msg/MsgReducer'
import { SocketContext } from "../../App"
import UserSkeliton from '../reuse/UserSkeliton'
import { toggleContacts } from "../..//Redux/reducers/utils/Features";

const Users = () => {
  const dispatch: AppDispatch = useDispatch()
  const { chatSearchValue, friends, isLoading, chatLoading } = useSelector((state: RootState) => state.msg)
  const { startCall, user } = useSelector((state: RootState) => state.auth)
  const socket = useContext(SocketContext)

  const handleOnClick = async (friend: ConnectionResult) => {
    const friendIndex = friends.findIndex((f) => f === friend);
    if (friendIndex !== -1) {
      dispatch(setCurrentGrpOrUser(friendIndex))
    }

    const data = {
      room_id: friend.room_id,
      user_id: friend.conn_type === "onetoone" ? friend.users?.filter((users) => users._id !== user?._id)[0]._id : null
    }
    if (socket.connected) {
      socket.emit('online_status', data, (ack: any) => {
        dispatch(handleSetStatus(ack))
      })
    }
  }

  const handleSearch = (user: ConnectionResult) => {
    const searchQuery = chatSearchValue.toLowerCase();
    const isNameMatched = user.display_name !== undefined ? user.display_name.toLowerCase().includes(searchQuery) : null
    const isMobileMatched = user.display_name && user.display_name.toLowerCase().includes(searchQuery);
    return isNameMatched || isMobileMatched;
  };
  const skeliton = new Array(20).fill(0)
  return (
    <>
      <header className=' w-full h-screen flex flex-col bg-[#111b21]'>
        <div className='relative z-10 ' >
          <Profile />
        </div>
        <div className='relative z-10'>
          <ContactsList />
        </div>
        <div className='relative z-10'>
          <CreateContact />
        </div>
        <div className='relative z-10'>
          <CreateGroup />
        </div>
        <div className='relative'>
          <ProfileHeader />
        </div>
        <div className=''>
          <SearchBar />
        </div>
        <div className={`${isLoading === true || chatLoading === true ? "mx-auto overflow-hidden no-scrollbar" : ""} overflow-y-auto custom-scrollbar`}>
          {
            chatLoading === true ?
              <div className=''>
                {skeliton.map((_, index: number) => (
                  <UserSkeliton key={index} />
                ))}
              </div>
              : friends.length === 0 ? <>
                <div className=' flex justify-center items-center h-screen'>
                  <button onClick={() => dispatch(toggleContacts(true))} className='text-black font-Rubik shadow-white shadow-sm hover:scale-105  px-3 py-2 border rounded-sm bg-[#02a698] before:w-0  transition-all'>add contact</button>
                </div>
              </> :
                friends.filter(handleSearch).map((each: ConnectionResult, index: number) => {
                  let call = each.room_id === startCall.userId && startCall.call === true
                  return (
                    <UserCard key={index} startCall={call} value={each} handleOnClick={() => handleOnClick(each)} />
                  )
                })}
        </div>
      </header>

    </>
  )
}

export default React.memo(Users)

