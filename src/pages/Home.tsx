// import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Redux/store'
import Users from '../components/utilities/Users'
import Chat from '../components/utilities/Chat'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllGroups } from '../Redux/reducers/msg/MsgReducer'

const Home = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const { profileOpen } = useSelector((state: RootState) => state.utils)
  const { createGrp } = useSelector((state: RootState) => state.msg)
  const { user, isLoading, isError, isSuccess } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(getAllGroups())
  }, [createGrp])
  useEffect(() => {
    if (user === null) {
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