import { ICall } from "../../Redux/reducers/Calls/CallsReducer";
import { IoMdArrowDropright } from "react-icons/io";
import { formatDate } from "./ReUseFunc";
import { CiVideoOn } from "react-icons/ci";
import { MiniUserCard } from "../utilities/CreateContact";

const AccordionItem = ({ data, id, isOpen, toggle }: { data: ICall, id: number, isOpen: boolean, toggle: any }) => {
    return (
        <div className="p-2  overflow-hidden border-b border-b-gray-600">
            <h2 className="relative">
                <button
                    id={`accordion-title-${id}`}
                    type="button"
                    className="flex items-center gap-5 w-full text-left py-2"
                    onClick={() => toggle(id)}
                    aria-expanded={isOpen}
                    aria-controls={`accordion-content-${id}`}>
                    <CiVideoOn size={25} />
                    <span className="text-[.91rem] font-Rubik italic ">Call Time:- {data.callDuration}m </span>
                    <IoMdArrowDropright size={25} className={`${isOpen ? "rotate-90" : ""} transition-all  absolute right-1 duration-200 delay-75 `} />
                    <span className="text-[.71rem] font-semibold absolute right-10 bottom-1">{formatDate(data.createdAt) === 'Today' ? new Date(data.createdAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        hour12: true,
                        minute: "numeric",
                    }) : formatDate(data.createdAt)}</span>
                </button>
            </h2>
            <div
                id={`accordion-content-${id}`}
                role="region"
                aria-labelledby={`accordion-title-${id}`}
                className={`grid text-sm overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}>
                <div className="overflow-hidden">
                    <p className="pb-3">Joined Users : {data.joinedUsers.length}</p>
                    <div className="flex flex-wrap">
                        {data.joinedUsers.map((eachUser: any, index: number) => (
                            <MiniUserCard key={index} name={eachUser.name ? eachUser.name : eachUser.mobile} profile={eachUser.profile} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccordionItem