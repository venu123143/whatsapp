import React from 'react'
import { ICall } from '../../Redux/reducers/Calls/CallsReducer'
import { CiVideoOn } from 'react-icons/ci'
import Avatars from '../utilities/Avatars'
import { CiLock } from "react-icons/ci";

const JoinCall = ({ data, id }: { data: ICall, id: number }) => {
    return (

        <div key={id} className='p-2 border-b space-y-3' >
            <div className='flex justify-between items-center'>
                <div className='flex gap-3'>
                    <CiVideoOn size={25} /> 
                    <h1 className='font-semibold '>Created By :
                        <span className='text-[1rem] font-medium tracking-wide' > {data.createdBy.name ? data.createdBy.name.split(' ')[0] : data.createdBy.mobile}</span> </h1>
                    {/* <p className='line-clamp-2'>Call Id {data._id }</p> */}
                </div>
                <div className=''>
                    <button className=' flex justify-center items-center transition-all ease-in gap-3 px-3 py-2 hover:border-[#008000] rounded-md hover:shadow-lg hover:shadow-green-600 hover:bg-green-600 bg-[#00a884]'>
                        {data.pin ? <CiLock size={25} /> : <CiVideoOn size={25} />}
                        <span className='text-[1rem] w-full font-[450] font-Poppins'>Join call</span>
                    </button>
                </div>
            </div>
            <div className=' w-fit'>
                <Avatars />
            </div>
            <div className=''>
                <span className='block font-serief italic' >
                    call Id : {data._id}
                </span>
                <span className={`${data.title || data.title?.trim() === "" ? "block text-[1rem] font-serief italic" : "hidden"}`}>
                    title: {data.title}
                </span>
            </div>
        </div>
    )
}

export default React.memo(JoinCall)