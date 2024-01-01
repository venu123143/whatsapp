import { BiCheckDouble } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { useDispatch } from "react-redux";
// import { RootState } from "../../Redux/store";
import { toggleEditMessage } from "../../Redux/reducers/utils/Features";

const Message = ({ right, message,date }: any) => {
    const dispatch = useDispatch();
    return (
        <div className={`flex ${right === true ? null : "flex-row-reverse"}`}>
            <p
                className={`${right === true
                    ? "ml-auto bg-[#008069] rounded-tl-md rounded-bl-md rounded-br-md"
                    : "bg-[#233138] rounded-tr-md rounded-br-md rounded-bl-md  mr-auto"
                    } group   text-[.91rem] w-fit max-w-sm  text-[#ededef]  mb-[10px]  px-2 py-1 `}
            >
                <span className="break-words">{message} </span>
                <span className=" flex h-fit w-fit ml-auto items-end justify-end">
                    <span className="text-[10px] text-[#ffffff99]">
                        {new Date(date).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            hour12: true,
                            minute: "numeric",
                        })}
                        <BiCheckDouble
                            className={`${right === true ? "inline text-[#4FB6EC]" : "hidden"
                                }`}
                            size={20}
                        />
                    </span>
                    <span
                        className={`group-hover:block hidden cursor-pointer`}
                        onClick={() => dispatch(toggleEditMessage(true))}
                    >
                        <AiOutlineDown />
                    </span>
                </span>
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
