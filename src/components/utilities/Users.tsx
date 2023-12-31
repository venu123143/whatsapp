// import React from 'react'
import Profile from './Profile'
import UserCard from '../cards/UserCard'
import ProfileHeader from './ProfileHeader'
import SearchBar from './SearchBar'
import { users } from "../../static/Static"
import ContactsList from '../../pages/Contacts'
const Users = () => {
  return (
    <>
      <header className='w-full h-screen flex flex-col'>
        <div className='relative z-10' >
          <Profile />
        </div>
        <div className='relative z-10'>
          <ContactsList />
        </div>
        <div className=''>
          <ProfileHeader />
        </div>
        <div className=''>
          <SearchBar />
        </div>
        <div className='overflow-y-auto custom-scrollbar'>
          {users.map((each, index) => (
            <UserCard key={index} value={each} />
          ))}
        </div>
      </header>

    </>
    // <div className="w-full flex flex-col">
    //   <header className="relative z-10">
    //     <Profile />
    //     <ProfileHeader />
    //     <SearchBar />
    //   </header>
    //   <div className="flex-1  max-h-full overflow-y-auto">
    //     {users.map((each, index) => (
    //       <UserCard key={index} value={each} />
    //     ))}
    //   </div>
    // </div>
  )
}

export default Users