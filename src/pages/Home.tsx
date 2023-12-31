import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'
import Users from '../components/utilities/Users'
import Chat from '../components/utilities/Chat'

const Home = () => {
  const { profileOpen } = useSelector((state: RootState) => state.utils)

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