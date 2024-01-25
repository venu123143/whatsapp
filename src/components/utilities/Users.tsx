import React from 'react'
import Profile from './Profile'
import UserCard from '../cards/UserCard'
import ProfileHeader from './ProfileHeader'
import SearchBar from './SearchBar'
import ContactsList from '../../pages/Contacts'
import CreateContact from './CreateContact'
import { AppDispatch, RootState } from '../../Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import CreateGroup from '../../pages/CreateGroup'
import { setCurrentGrpOrUser } from '../../Redux/reducers/msg/MsgReducer'
// import { SocketContext } from "../../pages/Home"

const Users = () => {
  const dispatch: AppDispatch = useDispatch()
  const { groups, chatSearchValue, users } = useSelector((state: RootState) => state.msg)
  const chats = [...groups, ...users]
  // const socket = useContext(SocketContext);

  const handleOnClick = async (each: any) => {
    dispatch(setCurrentGrpOrUser(each))
  }
  const handleSearch = (user: any) => {
    const searchQuery = chatSearchValue.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchQuery) ||
      (user.mobile && user.mobile.toLowerCase().includes(searchQuery))
    );
  };
  return (
    <>
      <header className='relative w-full h-screen flex flex-col bg-[#111b21]'>
        <div className='relative z-10' >
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
        <div className='overflow-y-auto custom-scrollbar'>
          {chats.filter(handleSearch).map((each, index) => (
            <UserCard key={index} value={each} handleOnClick={() => handleOnClick(each)} />
          ))}
        </div>
      </header>

    </>
  )
}

export default React.memo(Users)