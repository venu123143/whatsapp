"use client";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import { BiCheckDouble } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { toggleEditMessage } from "../../Redux/reducers/utils/Features"
import { RootState } from "../../Redux/store";
const EditMsg = () => {
    const dispatch = useDispatch();
    const { editmsg } = useSelector((store: RootState) => store.features);

    return (
        <div className="bg-black bg-opacity-50">
            <div
                className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 ${editmsg === true ? "scale-100 transition-all delay-75 duration-300" : "scale-0 transition-all delay-75 duration-300"
                    }  `}>
                <div className="bg-panel-header-background  w-[600px] relative">
                    <div className="flex items-center min-h-[50px] gap-4">
                        <div
                            className="absolute left-5 top-3"
                            onClick={() => dispatch(toggleEditMessage(false))}
                        >
                            <RxCross1 className="text-white cursor-pointer" />
                        </div>
                        <h2 className="text-white absolute left-14 top-2">Edit Message</h2>
                    </div>
                    <div className="bg-conversation-panel-background h-[290px] relative  items-center">
                        <p className="ml-auto bg-[#008069] absolute top-[30%] left-[43%]  group text-[.91rem] w-fit max-w-sm  text-[#ededef]  mb-[10px] rounded-md px-2 py-1 ">
                            <span className="break-words">heloooo </span>
                            <span className=" flex h-fit w-fit ml-auto items-end justify-end">
                                <span className="text-[10px] text-[#ffffff99]">
                                    {new Date().toLocaleTimeString("en-US", {
                                        hour: "numeric",
                                        hour12: true,
                                        minute: "numeric",
                                    })}
                                    <BiCheckDouble className="inline text-[#4FB6EC]" size={20} />
                                </span>
                            </span>
                        </p>
                    </div>
                    <div className="bg-panel-header-background h-[80px] flex gap-6 items-center justify-center absolute bottom-0 w-full">
                        <div className="w-[400px] rounded-lg flex items-center ml-5">
                            <input
                                type="text"
                                placeholder="type a message"
                                className="bg-input-background text-sm focus:outline-none text-white h-10 px-5 py-4 rounded-lg w-full"
                            />
                        </div>
                        <div
                            className="flex w-10 items-center justify-center"
                            onClick={() => dispatch(toggleEditMessage(false))}
                        >
                            <button className="flex gap-3" type="submit">
                                <AiOutlineCheck
                                    className="text-panel-header-icon cursor-pointer w-9 h-9 p-1 bg-green-500 rounded-full text-xl"
                                    title="send"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditMsg;
