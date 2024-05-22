import React, { useState } from 'react'
import { ICall } from '../../Redux/reducers/Calls/CallsReducer';
import UserSkeliton from '../reuse/UserSkeliton';
import JoinCall from './JoinCall';
import { BsSearch } from 'react-icons/bs';

const LiveCalls = ({ calls }: { calls: ICall[] }) => {
    const [searchInput, setSearchInput] = useState("")

    const skeliton = new Array(10).fill(0)

    return (
        <section className={`h-screen w-full flex flex-col text-white`}>
            <div className="header-bg  flex items-center justify-center gap-4 ">
                <h1 className="text-white text-[1.6rem] font-[450] italic">Live calls</h1>
            </div>
            {/* <div className='hover:shadow-green-700 hover:shadow-lg pb-2 z-10 p-2 max-h-[100px] custom-scrollbar w-full overflow-auto text-justify text-[.91rem] bg-[#202c33]'>
                With our platform, you can easily join calls initiated by your friends, fostering meaningful connections regardless of distance.
                Here's how it works: simply navigate to your friend's call and join in with a single click. If your friend has set a pin for the call
                to ensure privacy and security, don't worry! Getting access is still a breeze. Just reach out to your friend to obtain the pin, and you're all set to join the conversation.
                Stay in touch, share moments, and enjoy uninterrupted conversations with your loved ones through our user-friendly video call feature. Connect with ease, wherever you are.
            </div> */}
            <section className="w-full">
                <div className="header-bg flex w-full py-3 px-5 items-center gap-3">
                    <div className="border border-gray-500 flex gap-5 py-2  w-full  rounded-lg ">
                        <div className="ml-4 flex items-center justify-center">
                            <BsSearch className="text-panel-header-icon sm:cursor-pointer text-xl" />
                        </div>
                        <input value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            type="text"
                            placeholder="Search name or number"
                            className="bg-transparent text-md focus:outline-none text-white w-full "
                        />
                    </div>
                </div>
            </section>
            <div className="bg-[#111b21] h-full overflow-y-scroll custom-scrollbar">
                {
                    calls.length === 0 ?
                        <>
                            <div className=''>
                                {skeliton.map((_, index: number) => (
                                    < UserSkeliton key={index} />
                                ))}
                            </div>
                        </> :
                        <>
                            {calls.map((call: ICall, index: number) => (
                                <JoinCall key={index} data={call} id={index} />
                            ))}

                        </>
                }
            </div>
        </section>
    )
}

export default React.memo(LiveCalls)