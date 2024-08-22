import React from "react"
import { BiCheck, BiCheckDouble } from "react-icons/bi"
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";

const ImageComp: React.FC<{ right: boolean, image: any, date: Date, onClick: () => void, seen: boolean }> = ({ right, image, date, onClick, seen }) => {
    // URL.createObjectURL(image)
    const { currentUserIndex, friends } = useSelector((state: RootState) => state.msg);

    return (
        <section className={`${right === true ? "bg-[#02a698] ml-auto" : "bg-[#233138] mr-auto"}  relative rounded-lg p-1 w-fit`}>
            <div className="z-0">
                <img onClick={onClick} src={image} alt="imagee" className="max-w-[320px] max-h-[340px] min-w-[200px] flex-grow-0 flex-shrink-0 transition-[filter] duration-150 ease-linear rounded-lg" />
                {/* <img onClick={onClick} src={image} alt="imagee" className="rounded-lg" height={300} width={300} /> */}
                <div className="absolute bottom-1 right-1 flex items-end gap-1">
                    <span className="text-[#8696a0] text-[11px] pt-1 min-w-fit">
                        {new Date(date).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            hour12: true,
                            minute: "numeric",
                        })}
                    </span>
                    <span className={`${right === true ? "" : ""}text-[#8696a0] `}>
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
                </div>
            </div>


        </section>
    )
}

export default ImageComp