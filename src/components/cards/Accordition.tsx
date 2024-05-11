import { ICall } from "../../Redux/reducers/Calls/CallsReducer";
import { IoMdArrowDropright } from "react-icons/io";
import { formatDate } from "./ReUseFunc";

const AccordionItem = ({ data, id, isOpen, toggle }: { data: ICall, id: number, isOpen: boolean, toggle: any }) => {
    return (
        <div className="p-2 overflow-hidden border-b border-b-gray-600">
            <h2>
                <button
                    id={`accordion-title-${id}`}
                    type="button"
                    className="flex items-center justify-between w-full text-left font-semibold py-2"
                    onClick={() => toggle(id)}
                    aria-expanded={isOpen}
                    aria-controls={`accordion-content-${id}`}>
                    {/* <span>{data.createdAt}</span> */}
                    <span>{formatDate(data.createdAt) === 'Today' ? new Date(data.createdAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        hour12: true,
                        minute: "numeric",
                    }) : formatDate(data.createdAt)}</span>
                    <IoMdArrowDropright size={25} className={`${isOpen ? "rotate-90" : ""} transition-all duration-200 delay-75 `} />
                </button>
            </h2>
            <div
                id={`accordion-content-${id}`}
                role="region"
                aria-labelledby={`accordion-title-${id}`}
                className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="pb-3">{data.callType}</p>
                </div>
            </div>
        </div>
    );
};

export default AccordionItem