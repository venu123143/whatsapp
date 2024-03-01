import React, { useContext, useEffect } from 'react'
import Profile from './Profile'
import UserCard from '../cards/UserCard'
import ProfileHeader from './ProfileHeader'
import SearchBar from './SearchBar'
import ContactsList from '../../pages/Contacts'
import CreateContact from './CreateContact'
import { AppDispatch, RootState } from '../../Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import CreateGroup from '../../pages/CreateGroup'
import { CommonProperties, handleSetStatus, setCurrentGrpOrUser } from '../../Redux/reducers/msg/MsgReducer'
import { SocketContext } from "../../pages/Home"
import { ClipLoader } from 'react-spinners'

const Users = () => {
  const dispatch: AppDispatch = useDispatch()
  const { chatSearchValue, friends, isLoading } = useSelector((state: RootState) => state.msg)
  const { user } = useSelector((state: RootState) => state.auth)
  const socket = useContext(SocketContext)

  const handleOnClick = async (friend: CommonProperties) => {
    const friendIndex = friends.findIndex(f => f === friend);
    dispatch(setCurrentGrpOrUser(friendIndex))
    const data = {
      senderId: user?.socket_id,
      recieverId: friends[friendIndex].socket_id
    }
    if (socket.connected) {
      socket.emit('online_status', data)
    }

  }

  useEffect(() => {
    if (socket.connected) {
      socket.on('user_status', (status) => {
        dispatch(handleSetStatus(status))
      })
      return () => {
        if (socket.connected) {
          socket.off("user_status");
        }
      };
    }
  }, [socket])

  const handleSearch = (user: any) => {
    const searchQuery = chatSearchValue.toLowerCase();
    const isNameMatched = user.name !== undefined ? user.name.toLowerCase().includes(searchQuery) : null
    const isMobileMatched = user.mobile && user.mobile.toLowerCase().includes(searchQuery);
    return isNameMatched || isMobileMatched;
  };
  return (
    <>
      <header className='relative w-full h-screen flex flex-col bg-[#111b21]'>
        <div className='relative ' >
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
        <div className=''>
          <ProfileHeader />
        </div>
        <div className=''>
          <SearchBar />
        </div>
        <div className={`${isLoading === true ? "mx-auto overflow-hidden no-scrollbar" : ""} overflow-y-auto custom-scrollbar`}>

          {
            isLoading === true ?
              <ClipLoader
                color="#36d7b7"
                loading={isLoading}
                aria-label="Loading Spinner"
                speedMultiplier={.71}
                data-testid="loader"
                className=''
              />
              :
              friends.filter(handleSearch).map((each: CommonProperties, index: number) => {
                // const unread = each.chat.filter((msg: any) => msg.seen === false && msg.right === false).length
                return (
                  <UserCard key={index} value={each} handleOnClick={() => handleOnClick(each)} />
                )
              })}
        </div>
      </header>

    </>
  )
}

export default React.memo(Users)