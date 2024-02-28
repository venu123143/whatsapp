import { BiCheckDouble, BiCheck } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { useSelector } from "react-redux";
// import { RootState } from "../../Redux/store";
import { RootState } from "../../Redux/store";
import React, { useEffect, useRef, useState } from "react";
import useCloseDropDown from "../reuse/CloseDropDown"
import { Link } from "react-router-dom";
import { FaCircleChevronDown } from "react-icons/fa6";

const Message = ({ right, message, date, seen }: any) => {
    const { currentUserIndex, friends } = useSelector((state: RootState) => state.msg);
    const [options, setOptions] = useCloseDropDown(false, '.dropdown');
    const [optionPosition, setOptionPosition] = useState('')
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (messageRef.current) {
                const { top } = messageRef.current.getBoundingClientRect();
                const screenHeight = window.innerHeight;
                const isMessageAtTop = top <= screenHeight / 2;
                if (isMessageAtTop) {
                    setOptionPosition('bottom')
                } else {
                    setOptionPosition('top');
                }
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    function renderMessageWithLinks(message: string) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return message.split(urlRegex).map((part, index) => {
            if (part.match(urlRegex)) {
                return <a key={index} href={part} target="_blank" className="text-[#53bded] hover:text-[#111b21] focus:text-[#0056b3] focus:outline-none hover:underline" rel="noopener noreferrer">{part}</a>;
            } else {
                return <span key={index}>{part}</span>;
            }
        });
    }
    const handleToggleOptions = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setOptions(!options)
    }

    return (
        <div ref={messageRef} className={`flex ${right === true ? null : "flex-row-reverse"} `}>
            <p className={`${right === true
                ? "ml-auto bg-[#008069] rounded-tl-md rounded-bl-md rounded-br-md"
                : "bg-[#233138] rounded-tr-md rounded-br-md rounded-bl-md  mr-auto"
                } group  relative text-[.91rem] w-fit max-w-sm  text-[#ededef]  mb-[10px]  px-2 py-1 `} >
                <span className="break-words">
                    {renderMessageWithLinks(message)}
                </span>
                <span className=" flex h-fit w-fit ml-auto items-end justify-end">
                    <span className="text-[10px] text-[#ffffff99]">
                        {new Date(date).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            hour12: true,
                            minute: "numeric",
                        })}
                        {seen === true ?
                            <BiCheckDouble
                                className={`${right === true ? "inline text-[#4FB6EC]" : "hidden"
                                    }`}
                                size={20}
                            /> :
                            friends[currentUserIndex]?.online_status === "true" ?
                                <BiCheckDouble
                                    className={`${right === true ? "inline text-[#ffffff99]" : "hidden"
                                        }`}
                                    size={20}
                                /> :
                                <BiCheck
                                    className={`${right === true ? "inline text-[#f0f2f5]" : "hidden"
                                        }`}
                                    size={20}
                                />

                        }
                    </span>
                    <span className={`${right === true ? "bg-[#008069] " : "bg-[#233138] "} 
                    absolute top-0 right-2 group-hover:translate-y-0 translate-y-5 group-hover:visible invisible transition-all shadow-sm
                     shadow-black  p-1 rounded-b-full sm:cursor-pointer`}
                        onClick={handleToggleOptions}>
                        <AiOutlineDown size={15} />
                    </span>
                </span>
                <div
                    className={`${optionPosition === 'bottom' ? right === true ? "top-12 right-0" : "-right-52 top-5" : right === true ? "bottom-12 right-0" : "left-0 bottom-12"} 
                    ${options ? "scale-y-100 opacity-100  duration-300 shadow-lg rounded-sm delay-75 translate-x-0 no-scrollbar" : "scale-y-0 translate-x-10 w-0 opacity-0"} 
                 transition-all ease-in-out origin-top-right dropdown z-10 `}>
                    <div className="">
                        <button className="options" role="menuitem" id="menu-item-0">Profile</button>
                        <button className="options" role="menuitem" id="menu-item-1">
                            <span>Theme</span>
                            <FaCircleChevronDown className="inline font-Rubik" />
                        </button>
                        <Link to="#" className="options">Account settings</Link>
                        <button className="options" role="menuitem" id="menu-item-0">Close Chat</button>
                    </div>
                </div>
            </p>

            {right === true ? (
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
