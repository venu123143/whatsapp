import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCamera } from "react-icons/ai";
// AiOutlineArrowRight
import { AppDispatch, RootState } from "../Redux/store";
import {  toggleCreateGroup } from "../Redux/reducers/msg/MsgReducer";
import { PiUserLight } from "react-icons/pi";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toggleContacts, toggleCreateContact } from "../Redux/reducers/utils/Features";
import { handleProfileOpen } from "../Redux/reducers/utils/utilReducer";
import { SocketContext } from "../App";
import { toast } from "react-toastify";

const CreateGroup = () => {
    // const { user } = useSelector((state: RootState) => state.auth)
    const socket = useContext(SocketContext)
    const [groupImage, setGroupImage] = useState<File | null>(null);
    const dispatch: AppDispatch = useDispatch();
    const { createGrp, selectedUsersToGroup } = useSelector((state: RootState) => state.msg);
    const [groupName, setGroupName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    // const [profile, setProfile] = useState("")
    // const formData = new FormData()

    const handleCreateGroup = () => {
        if (groupName.trim() === "") {
            window.alert("group name is required.")
        } else if (selectedUsersToGroup.length <= 0) {
            window.alert("select atleast one user to create group.")
        } else {
            setIsLoading(true)
            const ConnectionInfo = {
                conn_name: groupName.trim(),
                profile: groupImage
            }
            if (socket.connected) {
                socket.emit("create_connection", selectedUsersToGroup, "group", ConnectionInfo, (ack: any) => {
                    console.log(ack);

                    if (ack.error) {
                        setIsLoading(false)
                        toast.error(ack.error, { position: "top-left" })
                        return
                    }
                    if (ack.success) {
                        setIsLoading(false)
                        toast.success(ack.success, { position: "top-left" })
                        setGroupName("")
                        setGroupImage(null)
                        dispatch(toggleCreateGroup(false))
                        dispatch(toggleCreateContact(false))
                        dispatch(handleProfileOpen(true))
                        dispatch(toggleContacts(false))
                        return
                    }
                });
            }
        }
    }
    // useEffect(() => {
    //     if (singleGroup !== null && socket.connected) {
    //         socket.emit("create_group", singleGroup)
    //     }
    // }, [singleGroup, socket])

    // Function to handle image selection
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setGroupImage(files[0]);
        }
    }
    const handleCloseCreateGroup = () => {
        dispatch(toggleCreateGroup(false))
        setGroupImage(null)
        setGroupName("")
    }
    return (
        <div className={`h-screen flex flex-col text-white absolute top-0 left-0 w-full header-bg transition-all ease-linear  duration-300 delay-150 ${createGrp === true ? "-translate-x-0  z-20" : "-translate-x-full"}`}>
            <div className="hover:shadow-blue-500 hover:shadow-lg icons flex items-center gap-4  "
                onClick={handleCloseCreateGroup}>
                <AiOutlineArrowLeft className="text-white sm:cursor-pointer w-9" />
                <h1 className="text-white font-[400] ">New Group</h1>
            </div>
            <section className=" py-3 px-5 items-center gap-3">
                <div className={` transition-all ease-linear duration-200 delay-500  flex justify-center`}>
                    {/* Display selected image */}
                    {groupImage !== null ? (
                        <img src={URL.createObjectURL(groupImage)} alt="Selected Group Image" className=" w-48 h-48 sm:cursor-pointer hover:shadow-orange-500 shadow-lg  object-cover rounded-full mt-10" />
                    ) :
                        <>
                            <label htmlFor="groupImage" className="bg-[#111b21] hover:bg-[#0c1317] hover:bg-opacity-90 hover:shadow-orange-500 shadow-lg relative group rounded-full p-3 sm:cursor-pointer hover:opacity-90 mt-10">
                                <PiUserLight size={180} className="hover:text-gray-500" />
                                <div className={`${isLoading === true ? "block" : "group-hover:block"} sm:cursor-pointer  absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10 items-center`}>
                                    {
                                        isLoading === true ?
                                            <ClipLoader
                                                color="#36d7b7"
                                                loading={false}
                                                aria-label="Loading Spinner"
                                                speedMultiplier={.71}
                                                data-testid="loader"
                                            />
                                            :
                                            <AiOutlineCamera className="text-white " size={40} />
                                    }
                                </div>
                            </label>
                            <input id="groupImage" onChange={handleImageChange} accept=".jpg, .jpeg, .png" type="file" className="hidden" />
                        </>
                    }
                </div>
                <div className="mt-10 m-auto w-full flex flex-col gap-4">
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input placeholder=" Group Name ( * ) " onChange={(e) => setGroupName(e.target.value)} value={groupName}
                            className="peer h-full w-full border-b-2 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-lg font-normal text-blue-gray-700 
                            outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-[#00a884] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>
                </div>
            </section>
            <section className="sm:cursor-pointer m-auto max-h-full h-auto mt-20">
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