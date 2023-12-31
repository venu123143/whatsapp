// import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { BsSearch } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { toggleContacts } from "../Redux/reducers/utils/Features";
import { RootState } from "../Redux/store";
import SingleChat from "../components/cards/UserCard";

const ContactsList = () => {
    const dispatch = useDispatch();
    // const { chatArray } = useSelector((store: RootState) => store.auth);
    const { users, contacts } = useSelector((state: RootState) => state.features);

    let groupedByInitial: Record<string, any[]> = {};

    users.forEach((obj: any) => {
        const initial = obj?.name?.charAt(0);
        if (!groupedByInitial[initial]) {
            groupedByInitial[initial] = [];
        }
        groupedByInitial[initial].push(obj);
    });

    return (
        <div className={`h-screen flex flex-col text-white absolute top-0 left-0 w-full header-bg transition-all ease-linear  duration-300 delay-150 ${contacts === true ? "-translate-x-0  z-20" : "-translate-x-full"}`}>
            <div className="icons flex items-center gap-4  "
                onClick={() => dispatch(toggleContacts(false))}>
                <AiOutlineArrowLeft className="text-white cursor-pointer w-9" />
                <h1 className="text-white font-[400] ">New Chat</h1>
            </div>
            <section className="h-14">
                <div className=" header-bg flex py-3 pl-5 items-center gap-3">
                    <div className="singleuser flex items-center gap-5 flex-grow px-5 mr-3 py-1 rounded-lg ">
                        <div>
                            <BsSearch className="text-panel-header-icon cursor-pointer text-l" />
                        </div>
                        <div className="">
                            <input
                                type="text"
                                placeholder="Search name or number"
                                className="bg-transparent text-sm focus:outline-none text-white w-full "
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* h-[calc(100vh-100px)] */}
            <section className=" overflow-y-scroll custom-scrollbar">
                {Object.entries(groupedByInitial).map(
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
    );
};

export default ContactsList;
