import React from 'react'
import Profile from './Profile'
import UserCard from '../cards/UserCard'
import ProfileHeader from './ProfileHeader'
import SearchBar from './SearchBar'
import ContactsList from '../../pages/Contacts'
import CreateContact from './CreateContact'
import { RootState } from '../../Redux/store'
import { useSelector } from 'react-redux'
import CreateGroup from '../../pages/CreateGroup'
const Users = () => {
  const { groups, users } = useSelector((state: RootState) => state.msg)

  const charts = [...groups, ...users]
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
          {charts.map((each, index) => (
            <UserCard key={index} value={each} />
          ))}
        </div>
      </header>

    </>
  )
}

export default React.memo(Users)