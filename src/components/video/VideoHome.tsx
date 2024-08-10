import React, { useEffect, useState } from 'react'
// import { useLocation, useNavigate, useParams, } from 'react-router-dom';
import CallHistory from './CallHistory';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { getAllCallsHistory, getAllLiveCalls } from '../../Redux/reducers/Calls/CallsReducer';
import LiveCalls from './LiveCalls';
import { useNavigate } from 'react-router-dom';
import CreateCall from './CreateCall';

const VideoHome = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const { recentCalls, liveCalls } = useSelector((state: RootState) => state.calls)
    const { user } = useSelector((state: RootState) => state.auth)

    const [contactInfo, setContactInfo] = useState(false)
    // const location = useLocation();
    // console.log(location);
    // const { userId } = useParams()
    useEffect(() => {
        dispatch(getAllCallsHistory())
        dispatch(getAllLiveCalls())
        setContactInfo(false)
    }, [])
    useEffect(() => {
        if (user === null) {
            navigate('/login')
        }
    }, [user])
    const background = new Array(20).fill(0)
    return (
        <>
            <section className=' block sm:grid grid-cols-10 w-full h-screen'>
                <aside className='col-span-3'>
                    <LiveCalls calls={liveCalls} />
                </aside>
                <main className='col-span-4 relative flex items-center '>
                    {/* <button className='w-full p-2 border mt-5 hover:shadow-xl transition-all hover:bg-yellow-100  ease-linear shadow-md rounded-sm' onClick={() => setContactInfo(!contactInfo)}>click me</button> */}
                    <div className="absolute top-0 left-0 area">
                        <ul className="circles">
                            {background.map((_, index) => <li key={index}></li>)}
                        </ul>
                    </div>
                    <CreateCall />
                </main>
                <section className={`sm:col-span-3 sm:static fixed top-0 right-0 w-full transition-all ease-linear  duration-300 delay-150 ${contactInfo === true ? "-translate-x-0  z-20" : "sm:-translate-x-0 translate-x-full"}`}>
                    <CallHistory calls={recentCalls} />
                </section>
            </section>
        </>
    )
}

export default React.memo(VideoHome)