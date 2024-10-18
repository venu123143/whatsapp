
import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { BsSearch } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
// AiOutlineArrowRight
import { toggleContacts, toggleCreateContact } from "../Redux/reducers/utils/Features";
import { AppDispatch, RootState } from "../Redux/store";
import SingleChat from "../components/cards/UserCard";
import { FaCircleUser } from "react-icons/fa6";
import { CommonProperties, getAllUsers } from "../Redux/reducers/msg/MsgReducer";
import { UserState } from "../Redux/reducers/Auth/AuthReducer";
import { SocketContext } from "../App";
import UserSkeliton from "../components/reuse/UserSkeliton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ContactsList = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()


    // const { chatArray } = useSelector((store: RootState) => store.auth);
    const { contacts, createContact } = useSelector((state: RootState) => state.features);
    const { user } = useSelector((state: RootState) => state.auth);
    const { users } = useSelector((state: RootState) => state.msg);
    const socket = useContext(SocketContext);

    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        if (user) {
            dispatch(getAllUsers())
        } else {
            navigate('/login')
        }
    }, [])

    let groupedByInitial: Record<string, any[]> = {};

    users?.forEach((obj: any) => {
        const initial = obj?.name?.charAt(0).toLowerCase() ? obj?.name?.charAt(0).toLowerCase() : obj.mobile.charAt(0)
        if (!groupedByInitial[initial]) {
            groupedByInitial[initial] = [];
        }
        groupedByInitial[initial].push(obj);
    });


    const handleAddUser = () => {
        dispatch(toggleCreateContact(!createContact))
    }

    const handleSearch = (user: CommonProperties) => {
        const searchQuery = searchInput.toLowerCase();
        const isNameMatched = user.name !== undefined ? user.name.toLowerCase().includes(searchQuery) : null
        const isMobileMatched = user.mobile && user.mobile.toLowerCase().includes(searchQuery);
        return isNameMatched || isMobileMatched;
    };


    const createConnection = (user: UserState) => {
        if (socket.connected) {
            socket.emit("create_connection", [user._id], "onetoone", null, (ack: any) => {
                if (ack.error) {
                    toast.error(ack.error, { position: "top-left" })
                    return
                }
            });
        }
        dispatch(toggleContacts(false))
        setSearchInput("")
    }
    const goBackToHome = () => {
        dispatch(toggleContacts(false))
        setSearchInput("")
    }
    const skeliton = new Array(10).fill(0)
    return (
        <div className={`h-screen w-full flex flex-col text-white absolute top-0 left-0 header-bg transition-all ease-linear  duration-300 delay-150 ${contacts === true ? "-translate-x-0  z-20" : "-translate-x-full"}`}>
            <div className="icons max-h-[40px] sm:max-h-40 flex items-center gap-4 "
                onClick={goBackToHome}>
                <AiOutlineArrowLeft className="text-white sm:cursor-pointer w-9" />
                <h1 className="text-white font-[200] sm:font-[400] ">New Chat</h1>
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
            <section className="bg-[#111b21] overflow-y-scroll custom-scrollbar">
                {
                    users.length === 0 ?
                        <>
                            <div className=''>
                                {skeliton.map((_, index: number) => (
                                    < UserSkeliton key={index} />
                                ))}
                            </div>
                        </> :
                        <>

                            <section onClick={handleAddUser} className="singleuser  hover:bg-[#313d46] w-full grid grid-cols-5 p-3  gap-3">
                                <div className="col-span-1 flex justify-center ">
                                    <FaCircleUser size={50} className="text-[#00a884]" />
                                </div>
                                <div className="col-span-4 flex items-center">
                                    <p className="text-[20px] font-bold">Create Group</p>
                                </div>
                            </section>

                            {Object.entries(groupedByInitial)
                                .sort(([initialA], [initialB]) => initialA.localeCompare(initialB))
                                .map(([initialLetter, users], index) => {
                                    const filteredUsers = users.filter(handleSearch);

                                    if (filteredUsers.length > 0) {
                                        return (
                                            <div key={index}>
                                                <div className="singleuser p-3  border-b border-gray-800 text-teal-light">
                                                    {initialLetter}
                                                </div>
                                                {filteredUsers.map((user: any, idx: number) => (
                                                    <SingleChat key={idx} value={user} contacts={true} handleOnClick={() => createConnection(user)} />
                                                ))}
                                            </div>
                                        );
                                    }
                                    return null; // Don't render the section if there are no matching users
                                })}
                        </>
                }
            </section>
        </div>
    );
};

export default React.memo(ContactsList);
