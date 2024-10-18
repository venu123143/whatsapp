import { BiCheckDouble, BiCheck } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../Redux/store";
import { AppDispatch, RootState } from "../../Redux/store";
import React, { useRef } from "react";
import useCloseDropDown from "../reuse/CloseDropDown"
import { Link } from "react-router-dom";
import { FaCircleChevronDown } from "react-icons/fa6";
import { handleEditMsg, handleSetReply, IMessage } from "../../Redux/reducers/msg/MsgReducer";
import { toggleDeleteMessage, toggleEditMessage } from "../../Redux/reducers/utils/Features";
import { LuTimer } from "react-icons/lu";

const Message = ({ message, color, scrollToMessage, index }: { message: IMessage, color: string, scrollToMessage: any, index: number }) => {

    const { currentUserIndex, friends } = useSelector((state: RootState) => state.msg);
    const [options, setOptions] = useCloseDropDown(false, '.dropdown');
    const messageRef = useRef<HTMLDivElement>(null);
    const dispatch: AppDispatch = useDispatch()

    function renderMessageWithLinks(message: IMessage) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return message.message.split(urlRegex).map((part, index) => {
            if (part.match(urlRegex)) {
                return <a key={index} href={part} target="_blank" className="text-[#0000EE] hover:text-[#2e3336] focus:text-[#551A8B] focus:outline-none hover:underline" rel="noopener noreferrer">{part}</a>;
            } else if (part.includes("This message is deleted")) {
                return <span className="deleted-msg-style" key={index}>{part}</span>;
            } else {
                return <span key={index}>{part}</span>;
            }
        });
    }
    const handleToggleOptions = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setOptions(!options)
    }
    const handleTagReply = () => {
        dispatch(handleSetReply(message))
        setOptions(false)
    }
    const editMessage = () => {
        dispatch(toggleEditMessage(true))
        // let users = message.conn_type === "group" ? friends[currentUserIndex].users : null
        dispatch(handleEditMsg({ ...message, index: index }))
    }
    const deleteMessage = () => {
        dispatch(toggleDeleteMessage(true))
        dispatch(handleEditMsg({ ...message, index: index }))
        // let users = message.conn_type === "group" ? friends[currentUserIndex].users : null
        // dispatch(handleEditMsg({ ...message, index: index, users }))
    }

    return (
        <div ref={messageRef} id={`message-${message._id ? message._id : index}`} className={`flex ${message.isMyMsg === true ? null : "flex-row-reverse"} `}>
            <div className={`${message.isMyMsg === true
                ? "ml-auto bg-[#008069] rounded-tl-md rounded-bl-md rounded-br-md"
                : "bg-[#233138] rounded-tr-md rounded-br-md rounded-bl-md  mr-auto"
                } group relative text-[.91rem] w-fit max-w-sm  text-[#ededef]  px-1 py-1 `} >

                <h3 className={`${message.isMyMsg === true ? "hidden" : message.conn_type === 'group' ? `block ${color} ` : "hidden"} font-Rubik tracking-wide font-[500] text-[.91rem]`}>~ {message?.sender.name ? message.sender.name : message.sender.mobile}</h3>
                {
                    message.replyFor && (
                        <a href="#" onClick={() => scrollToMessage(message.replyFor?.id)} className={`${message.isMyMsg === true ? "bg-[#2e3f3a]  border-[#06cf9c]" : "bg-[#2e3f3a] border-[#53bdeb]"} max-w-sm flex flex-col bg-opacity-50 justify-center px-1 py-2 mb-1 rounded-lg font-[450] border-l-4`}>
                            <p className={`${message.isMyMsg === true ? "text-[#06cf9c]" : "text-[#53bdeb]"} text-[.91rem] font-semibold line-clamp-1`}>{message.replyFor?.name}</p>
                            <p className={`${message.isMyMsg === true ? "text-[#ffffff99]" : "text-slate-500 "}text-[.91rem]  line-clamp-1`}>{message.replyFor?.message}</p>
                        </a>
                    )
                }
                <span className={`" ${message.replyFor !== null ? "px-1" : null} `}>
                    {renderMessageWithLinks(message)}
                </span>
                <span className=" flex h-fit w-fit ml-auto items-end justify-end">
                    <span className="text-[10px] text-[#ffffff99]">
                        {new Date(message.date).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            hour12: true,
                            minute: "numeric",
                        })}
                        {
                            message.send === false ?
                                <LuTimer size={15} className={`${message.isMyMsg === true ? "inline text-[#ffffff99]" : "hidden"}`} />
                                :
                                message.seen === true ? <BiCheckDouble
                                    className={`${message.isMyMsg === true ? "inline text-[#4FB6EC]" : "hidden"
                                        }`}
                                    size={20}
                                /> :
                                    friends[currentUserIndex]?.online_status === true ?
                                        <BiCheckDouble
                                            className={`${message.isMyMsg === true ? "inline text-[#ffffff99]" : "hidden"
                                                }`}
                                            size={20}
                                        /> :
                                        <BiCheck
                                            className={`${message.isMyMsg === true ? "inline text-[#f0f2f5]" : "hidden"
                                                }`}
                                            size={20}
                                        />
                        }
                    </span>
                    <span className={`${message.isMyMsg === true ? "bg-[#008069] " : "bg-[#233138] "} 
                    absolute top-0 right-2 group-hover:translate-y-0 translate-y-5 group-hover:visible invisible transition-all shadow-sm
                     shadow-black  p-1 rounded-b-full sm:cursor-pointer`}
                        onClick={handleToggleOptions}>
                        <AiOutlineDown size={15} />
                    </span>
                </span>
                <div style={message.isMyMsg === true ? { top: 0, right: 50 } : { top: 0, left: 100 }}
                    className={`${options ? "scale-y-100 opacity-100 translate-x-0 " : "scale-y-0 translate-x-10 w-0 opacity-0"} 
                    msgOptions `}>
                    <div className="" >
                        <button onClick={handleTagReply} className="options" role="menuitem" id="menu-item-1">
                            <span>reply</span>
                            <FaCircleChevronDown className="inline font-Rubik" />
                        </button>
                        {message.isMyMsg === true &&
                            <button onClick={editMessage} className="options" role="menuitem" id="menu-item-0">edit</button>
                        }
                        {message.isMyMsg === true &&
                            <button onClick={deleteMessage} className="options" role="menuitem" id="menu-item-0">Delete Me</button>
                        }
                        <Link to="#" className="options">delete All</Link>
                        <button className="options" role="menuitem" id="menu-item-0">Close Chat</button>
                    </div>
                </div>
            </div>
            {/* <div className={`${right === false ? "block" : "hidden "}`}>
                {value?.profile ? (
                    <img src={value.profile} alt="profile image" className="rounded-full h-[50px] w-[50px] object-cover" />
                ) : (
                    <FaCircleUser size={50} className="text-slate-400" />
                )}
            </div> */}

            {message.isMyMsg === true ? (
                <span>
                    <svg
                        className={`ml-auto text-[#008069]  block align-middle`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 8 13"
                        width="8"
                        height="13"
                    >
                        <path
                            opacity=".13"
                            d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
                        ></path>
                        <path
                            fill="currentColor"
                            d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
                        ></path>
                    </svg>
                </span>
            ) : (
                <span>
                    <svg
                        className="mr-auto -scale-x-100 text-[#233138]  block align-middle"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 8 13"
                        width="8"
                        height="13"
                    >
                        <path
                            opacity=".13"
                            d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
                        ></path>
                        <path
                            fill="currentColor"
                            d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
                        ></path>
                    </svg>
                </span>
            )}
        </div>
    );
};

export default Message;
