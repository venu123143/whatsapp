import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCamera } from "react-icons/ai";
// AiOutlineArrowRight
import { AppDispatch, RootState } from "../Redux/store";
import { createGroup, toggleCreateGroup } from "../Redux/reducers/msg/MsgReducer";
import { PiUserLight } from "react-icons/pi";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toggleContacts, toggleCreateContact } from "../Redux/reducers/utils/Features";
import { handleProfileOpen } from "../Redux/reducers/utils/utilReducer";
import { SocketContext } from "../pages/Home"

const CreateGroup = () => {
    // const { socket } = useContext(SocketContext)
    // console.log(socket);
    const { user } = useSelector((state: RootState) => state.auth)
    const socket = useContext(SocketContext)

    const dispatch: AppDispatch = useDispatch();
    const { createGrp, selectedUsersToGroup, isLoading, singleGroup } = useSelector((state: RootState) => state.msg);
    const [groupName, setGroupName] = useState("")
    // const [profile, setProfile] = useState("")

    const handleCreateGroup = () => {
        if (groupName === "") {
            window.alert("group name is required.")
        } else if (selectedUsersToGroup.length <= 0) {
            window.alert("select atleast one user to create group.")
        } else {
            setGroupName("")
            dispatch(createGroup({ name: groupName, users: selectedUsersToGroup }))
            dispatch(toggleCreateContact(false))
            dispatch(handleProfileOpen(true))
            dispatch(toggleContacts(false))
        }
    }
    useEffect(() => {
        if (singleGroup !== null) {
            socket.emit("create_group", singleGroup)
        }
    }, [singleGroup, socket])
    return (
        <div className={`h-screen flex flex-col text-white absolute top-0 left-0 w-full header-bg transition-all ease-linear  duration-300 delay-150 ${createGrp === true ? "-translate-x-0  z-20" : "-translate-x-full"}`}>
            <div className="hover:shadow-blue-500 hover:shadow-lg icons flex items-center gap-4  "
                onClick={() => dispatch(toggleCreateGroup(false))}>
                <AiOutlineArrowLeft className="text-white cursor-pointer w-9" />
                <h1 className="text-white font-[400] ">New Group</h1>
            </div>
            <section className=" py-3 px-5 items-center gap-3">
                <div className={` transition-all ease-linear duration-200 delay-500  flex justify-center`}>
                    <div className="bg-[#111b21] hover:bg-[#0c1317] hover:bg-opacity-90 hover:shadow-orange-500 shadow-lg relative group rounded-full p-3 cursor-pointer hover:opacity-90 mt-10">
                        <PiUserLight size={180} className="hover:text-gray-500" />
                        <div className="hidden cursor-pointer group-hover:block absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10 items-center">
                            <AiOutlineCamera className="text-white " size={40} />
                        </div>
                    </div>
                </div>
                <div className="mt-10 m-auto w-full flex flex-col gap-4">
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input placeholder=" Group Name ( * ) " onChange={(e) => setGroupName(e.target.value)} value={groupName}
                            className="peer h-full w-full border-b-2 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-lg font-normal text-blue-gray-700 
                            outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-[#00a884] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                        {/* <label
                            className="after:content[' '] text-lg pointer-events-none absolute left-0 -top-3 flex h-full w-full select-none !overflow-visible truncate  font-normal leading-tight
                             text-[#00a884] transition-all after:absolute after:-bottom-2 after:block after:w-full after:scale-x-0 after:border-b-2.5 after:focus:border-[#00a884] 
                             after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight">
                            
                        </label> */}
                    </div>
                </div>
            </section>
            <section className="cursor-pointer m-auto max-h-full h-auto mt-20">
                {
                    isLoading === true ?
                        <ClipLoader
                            color="#36d7b7"
                            loading={isLoading}
                            aria-label="Loading Spinner"
                            speedMultiplier={.71}
                            data-testid="loader"
                        />
                        :
                        <div onClick={handleCreateGroup} className="p-3 shadow-lg  hover:bg-green-500 transition-all delay-100  duration-150 hover:scale-110 hover:border-2 hover:border-black rounded-full bg-[#00a884] w-fit m-auto text-white flex justify-center ">
                            <AiOutlineArrowRight size={30} className=" " />
                        </div>
                }
            </section>
        </div>
    )
}

export default React.memo(CreateGroup)