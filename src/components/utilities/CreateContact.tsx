import React, { useState } from "react";

import { RootState } from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleCreateContact } from "../..//Redux/reducers/utils/Features";
import SingleChat from "../../components/cards/UserCard";
import { RxCross2 } from "react-icons/rx"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import { storeSelectedUsers, toggleCreateGroup } from "../../Redux/reducers/msg/MsgReducer";
import { maskPhoneNumber } from "../cards/ReUseFunc"


export const MiniUserCard: React.FC<{ name: string, profile?: string, onClick?: any }> = ({ name, profile, onClick }) => {
    return (
        <div className="max-w-[150px]  flex justify-between gap-1 px-3 py-1 items-center ">
            <div className="flex justify-center ">
                {profile ? (
                    <img src={profile} alt="profile image" className="rounded-full h-[20px] w-[20px] object-cover" />
                ) : (
                    <FaCircleUser size={20} className="text-slate-400" />
                )}
            </div>
            <div className="">
                <h3 className="username font-sans text-[.81rem]">{name.split(' ')[0]}</h3>
            </div>
            <div onClick={onClick} className="sm:cursor-pointer rounded-full">
                <RxCross2 size={15} />
            </div>
        </div>
    )
}

const CreateContact = () => {
    const dispatch = useDispatch();
    const { createContact } = useSelector((state: RootState) => state.features);
    const { users } = useSelector((state: RootState) => state.msg);
    const [searchInput, setSearchInput] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const handleSearch = (user: any) => {
        const searchQuery = searchInput.toLowerCase();

        const isNameMatched = user.name !== undefined ? user.name.toLowerCase().includes(searchQuery) : null
        const isMobileMatched = user.mobile && user.mobile.toLowerCase().includes(searchQuery);

        return isNameMatched || isMobileMatched;
    };

    const handleSelectUser = (user: any) => {
        setSearchInput("")
        if (!selectedUsers.some((selectedUser) => selectedUser._id === user._id)) {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleRemoveUser = (userId: string) => {
        const updatedUsers = selectedUsers.filter((user) => user._id !== userId);
        setSelectedUsers(updatedUsers);
    };

    const isUserSelected = (userId: string) => selectedUsers.some((user) => user._id === userId);

    let groupedByInitial: Record<string, any[]> = {};
    users.forEach((obj: any) => {
        const initial = obj?.name?.charAt(0).toLowerCase();
        if (!groupedByInitial[initial]) {
            groupedByInitial[initial] = [];
        }
        groupedByInitial[initial].push(obj);
    });
    const createGroup = () => {
        if (selectedUsers.length > 0) {
            dispatch(toggleCreateGroup(true))
            const users = selectedUsers.map((user) => user._id)
            dispatch(storeSelectedUsers(users))
            setSelectedUsers([])
        } else {
            window.alert("Please select at least one user to create a group.");
        }
    }
    const hanldeDiscardChanges = () => {
        dispatch(toggleCreateContact(false))
        setSelectedUsers([])
        setSearchInput("")
    }
    return (
        <div className={`h-screen flex flex-col text-white absolute top-0 left-0 w-full transition-all ease-linear  duration-300 delay-150 ${createContact === true ? "-translate-x-0  z-20" : "-translate-x-full"}`}>
            <div className="flex bg-[#202c33] items-center gap-4 w-full p-5 h-20 sm:cursor-pointer" onClick={hanldeDiscardChanges}>
                <AiOutlineArrowLeft className="text-white sm:cursor-pointer" />
                <h1 className="text-white font-medium tracking-wide">Add Members to Group</h1>
            </div>
            <section className="bg-[#111b21] flex py-3 px-5 items-center gap-3">
                <div className=" m-auto w-full flex flex-col gap-4">
                    <div className="flex-wrap flex max-h-[200px] overflow-y-scroll custom-scrollbar">
                        {
                            selectedUsers.map((user, idx) => (
                                <MiniUserCard key={idx} name={user.name ? user.name : maskPhoneNumber(user.mobile)} profile={user.profile} onClick={() => handleRemoveUser(user._id)} />
                            ))
                        }
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input placeholder="Search here" autoFocus={true}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5  text-md font-sans text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200
                             focus:border-[#8696a0] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                        <label
                            className={`${searchInput ? 'after:border-gray-900 after:transition-transform after:duration-300' : ''} after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-[#8696a0] 
                            transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 
                            peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#8696a0] peer-focus:after:scale-x-100 peer-focus:after:border-[#8696a0] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`
                            }>
                            Search Name or Number
                        </label>
                    </div>

                </div>
            </section>

            <section className="bg-[#111b21] overflow-y-scroll custom-scrollbar">
                {Object.entries(groupedByInitial)
                    .sort(([initialA], [initialB]) => initialA.localeCompare(initialB))
                    .map(([initialLetter, users], index) => {
                        const filteredUsers = users.filter(handleSearch);
                        const unselectedUsers = filteredUsers.filter((user) => !isUserSelected(user._id));

                        if (unselectedUsers.length > 0) {
                            return (
                                <div key={index}>
                                    <div className="singleuser p-3  border-b border-gray-800 text-teal-light">
                                        {initialLetter}
                                    </div>
                                    {unselectedUsers.map((user: any, idx: number) => (
                                        <div key={idx}>
                                            <SingleChat handleOnClick={() => handleSelectUser(user)} value={user} contacts={true} />
                                        </div>
                                    ))}
                                </div>
                            );
                        }

                        return null;
                    })}

            </section>
            <section onClick={createGroup} className="cursor-pointer  mt-auto hover:bg-[#313d46] w-full grid grid-cols-5 p-3  gap-3">
                <div className="col-span-1 flex justify-center ">
                    <AiOutlineArrowRight size={30} className="text-[#00a884] " />
                </div>
                <div className="col-span-4 flex items-center">
                    <p className="text-[20px] font-bold">Create Group</p>
                </div>
            </section>

        </div>
    )
}

export default React.memo(CreateContact)