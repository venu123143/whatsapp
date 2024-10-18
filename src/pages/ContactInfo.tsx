import React from "react"
import { AppDispatch, RootState } from '../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { FaCircleUser } from 'react-icons/fa6';
import { MdDelete } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { FaThumbsDown } from "react-icons/fa";
import UserCard from '../components/cards/UserCard';
// import { UserState } from "../Redux/reducers/Auth/AuthReducer";
import { ChatUser, setCurrentGrpOrUser, toggleContactInfo } from "../Redux/reducers/msg/MsgReducer";
import { openfullScreen } from "../Redux/reducers/utils/Features";
import { handleProfileOpen } from "../Redux/reducers/utils/utilReducer";
import { maskPhoneNumber } from "../components/cards/ReUseFunc"

const ContactInfo = () => {
    const dispatch: AppDispatch = useDispatch();
    const { currentUserIndex, friends, contactInfo } = useSelector((state: RootState) => state.msg)
    const closeContact = () => {
        dispatch(toggleContactInfo(false))
    }

    let onClickUser = (user: ChatUser) => {

        const friendIndex = friends.map((friend) => friend.users?.includes(user))
        if (friendIndex) {
            dispatch(setCurrentGrpOrUser(friendIndex))
        } else {
            dispatch(handleProfileOpen(true))
        }
    }
    const ShowFullImage = () => {
        dispatch(openfullScreen({ currentImage: friends[currentUserIndex]?.profile, isFullscreen: true, zoomLevel: 1, currentIndex: 0 }))
    }
    return (
        <div className={`max-h-screen h-screen  md:max-w-[350px] border-l border-black flex flex-col bg-black text-white absolute top-0 right-0 w-full transition-all ease-linear  duration-300 delay-150 ${contactInfo === true ? "-translate-x-0  z-20" : "translate-x-full"}`}>
            <div className='h-16 gap-2 sm:gap-5 px-4 py-3 flex items-center bg-[#202c33]'>
                <div onClick={closeContact} className="top-4 left-4 w-fit p-3 icons ">
                    <RxCross2 size={25} className="text-white" title="cancel" />
                </div>
                <p className='text-[1rem] font-[450]'>Contact Info</p>
            </div>
            <div className='overflow-y-auto space-y-3 custom-scrollbar h-full'>
                <div className=' p-5 bg-[#111b21] space-y-5  sm:cursor-pointer'>
                    <div className='flex justify-center items-center'>
                        {friends[currentUserIndex]?.profile ? (
                            <img onClick={ShowFullImage} src={friends[currentUserIndex]?.profile} className={` group cursor-pointer rounded-full h-[200px] w-[200px] object-cover`} alt="Profile" />
                        ) : (
                            <div className=" p-1">
                                <FaCircleUser size={200} className="text-slate-400" />
                            </div>
                        )
                        }
                    </div>
                    <div>
                        <h3 className='text-[#d1d7db] font-Rubik tracking-wider text-[1.2rem] text-center'> {Number(friends[currentUserIndex]?.display_name) ? maskPhoneNumber(friends[currentUserIndex]?.display_name as string) : friends[currentUserIndex]?.display_name}</h3>
                        <p className='text-center text-[#667181] font-Rubik'>~ {friends[currentUserIndex]?.conn_type === "group" ? `Group ${friends[currentUserIndex]?.users?.length} members` : friends[currentUserIndex]?.display_name}</p>
                    </div>
                </div>
                <div className='p-4 px-8 bg-[#111b21] '>
                    <p className='text-[#8696a0] text-[.91rem]'>About</p>
                    <h4>{friends[currentUserIndex]?.about ? friends[currentUserIndex]?.about : 'No about for this user'}</h4>
                </div>
                <div className=''>
                    {
                        friends[currentUserIndex].users && friends[currentUserIndex].users?.slice().reverse().map((user, index) => {
                            let admin = friends[currentUserIndex] && friends[currentUserIndex]?.admins!.some(admin => admin === user._id);
                            return (
                                <UserCard key={index} value={user} contacts={true} isAdmin={admin} handleOnClick={() => onClickUser(user)} />
                            )
                        })
                    }
                </div>
                <div className='py-3 bg-[#111b21]'>
                    <div className='text-red-600 hover:bg-[#0c1317] px-7 py-2 sm:cursor-pointer font-Rubik font-[450] gap-5 flex justify- items-center text-[1rem]'>
                        <MdDelete size={20} />
                        <h3>Delete Chat</h3>
                    </div>
                    <div className='text-red-600 hover:bg-[#0c1317] px-7 py-2 sm:cursor-pointer font-Rubik font-[450] gap-5 flex justify- items-center text-[1rem]'>
                        <MdBlock size={20} />
                        <h3>Block {friends[currentUserIndex]?.display_name?.split(' ')[0]}</h3>
                    </div>
                    <div className='text-red-600 hover:bg-[#0c1317] px-7 py-2 sm:cursor-pointer font-Rubik font-[450] gap-5 flex justify- items-center text-[1rem]'>
                        <FaThumbsDown size={20} />
                        <h3>Report {friends[currentUserIndex]?.display_name?.split(' ')[0]}</h3>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default React.memo(ContactInfo)