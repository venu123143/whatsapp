import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../Redux/store'
import { setCallStart } from '../../Redux/reducers/Calls/CallsReducer'

const VideoCall = () => {
    const dispatch: AppDispatch = useDispatch()

    return (
        <div>
            <h1>video Ccall</h1>
            <button onClick={() => dispatch(setCallStart(false))} className='px-3 py-2 border shadow-lg rounded-md mx-10 bg-gradient-to-r from-slate-400 to-red-500'>stop call</button>
        </div>
    )
}

export default React.memo(VideoCall)