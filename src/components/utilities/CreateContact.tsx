// import { useState } from "react";

import { RootState } from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleCreateContact } from "../..//Redux/reducers/utils/Features";
import { BsSearch } from "react-icons/bs";
import SingleChat from "../../components/cards/UserCard";

import { AiOutlineArrowLeft  } from "react-icons/ai";
// AiOutlineArrowRight
const CreateContact = () => {
    const dispatch = useDispatch();

    // const { chatArray } = useSelector((store: RootState) => store.auth);
    const { users, createContact } = useSelector((state: RootState) => state.features);
    let groupedByInitial: Record<string, any[]> = {};

    users.forEach((obj: any) => {
        const initial = obj?.name?.charAt(0);
        if (!groupedByInitial[initial]) {
            groupedByInitial[initial] = [];
        }
        groupedByInitial[initial].push(obj);
    });
    return (
        <div className={`h-screen flex flex-col text-white absolute top-0 left-0 w-full header-bg transition-all ease-linear  duration-300 delay-150 ${createContact === true ? "-translate-x-0  z-20" : "-translate-x-full"}`}>
            <div className="flex w-full items-center gap-4 mt-10 pb-4 ml-8 cursor-pointer" onClick={() => dispatch(toggleCreateContact(false))}>
                <AiOutlineArrowLeft className="text-white cursor-pointer w-9" />
                <h1 className="text-white font-[400] ">Profile</h1>
            </div>
            <section className="">
                <div className=" header-bg flex py-3 px-5 items-center gap-3">
                    <div className="singleuser flex gap-5 py-2 m-auto w-full  rounded-lg ">
                        <div className="ml-4 flex items-center justify-center">
                            <BsSearch className="text-panel-header-icon cursor-pointer text-xl" />
                        </div>
                        <div className="w-full pr-4">
                            <input
                                type="text"
                                placeholder="Search name or number"
                                className="bg-transparent text-md focus:outline-none text-white w-full "
                            />
                        </div>
                    </div>
                </div>
              
            </section>

            <section className=" overflow-y-scroll custom-scrollbar">
                {Object.entries(groupedByInitial).sort(([initialA], [initialB]) => initialA.localeCompare(initialB)).map(
                    ([initialLetter, users], index) => (
                        <div key={index}>
                            <div className="text-teal-light ml-6 py-3 pb-6">
                                {initialLetter}
                            </div>
                            {users.map((user: any, idx: number) => (
                                <SingleChat value={user}
                                    key={idx}
                                />
                            ))}
                        </div>
                    )
                )}
            </section>

        </div>
    )
}

export default CreateContact