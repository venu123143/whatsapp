import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import UserSkeliton from '../reuse/UserSkeliton';
import AccordionItem from '../cards/Accordition';
import { ICall } from '../../Redux/reducers/Calls/CallsReducer';

const CallHistory = ({ calls }: { calls: ICall[] }) => {
    const skeliton = new Array(10).fill(0)
    const [openId, setOpenId] = useState<number | null>(null);

    const [searchInput, setSearchInput] = useState("")

    const toggle = (id: number) => {
        // If the current item is clicked again, close it
        if (openId === id) {
            setOpenId(null);
        } else {
            setOpenId(id);
        }
    };
    return (
        <>
            <section className={`h-screen w-full flex flex-col text-white`}>
                <div className="header-bg  flex items-center justify-center gap-4 ">
                    {/* <AiOutlineArrowLeft className="text-white sm:cursor-pointer w-9" /> */}
                    <h1 className="text-white text-[1.6rem] font-[450] italic  ">Recent calls</h1>
                </div>
                <section className=" w-full">
                    <div className=" header-bg flex w-full py-3 px-5 items-center gap-3">
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
                {/* h-[calc(100vh-100px)] */}
                <section className="bg-[#111b21] h-full overflow-y-scroll custom-scrollbar">
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
                                    <AccordionItem key={index} data={call} id={index} isOpen={openId === index} toggle={toggle} />
                                ))}

                            </>
                    }
                </section>
            </section>
        </>
    )
}

export default React.memo(CallHistory)