import React from "react"
import { BiCheckDouble } from "react-icons/bi"

const ImageComp: React.FC<{ right: boolean, image: any, date: Date, onClick: () => void }> = ({ right, image, date, onClick }) => {
    // URL.createObjectURL(image)
    return (
        <section className={`${right === true ? "bg-[#02a698] ml-auto" : "bg-[#233138] mr-auto"} mb-[10px] rounded-lg p-1 w-fit`}>
            <div className="relative">
                <img onClick={onClick} src={image} alt="imagee" className="rounded-lg" height={300} width={300} />
                <div className="absolute bottom-1 right-1 flex items-end gap-1">
                    <span className="text-[#8696a0] text-[11px] pt-1 min-w-fit">
                        {new Date(date).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            hour12: true,
                            minute: "numeric",
                        })}
                    </span>
                    <span className={`${right === true ? "" : ""}text-[#8696a0] `}>
                        <BiCheckDouble
                            className={`${right === true ? "inline text-[#4FB6EC]" : "hidden"}`}
                            size={20}
                        />
                    </span>
                </div>
            </div>


        </section>
    )
}

export default ImageComp