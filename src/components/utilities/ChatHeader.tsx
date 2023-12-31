import img from "../../assets/profile.jpg"
import { MdCall } from "react-icons/md"
import { IoMdVideocam } from "react-icons/io"
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs"
// import { useSelector } from "react-redux"
// import { RootState } from "../../Redux/store"
const ChatHeader = () => {
  // const { activeChat } = useSelector((store: RootState) => store.features)

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-[#202c33] ">
      <div className="flex items-center justify-center gap-6 chatList">
        <img src={img} alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
        <div className="flex flex-col">
          <span className="username font-bold">Srinivas</span>
          <span className="time text-sm">online</span>
        </div>
      </div>
      <div className="flex gap-2 time">
        <div className="icons">
          <MdCall className=" cursor-pointer text-xl" />
        </div>
        <div className="icons">
          <IoMdVideocam className="" />
        </div>
        <div className="icons">
          <BsSearch className="" />
        </div>
        <div className="icons m-0"> 
          <BsThreeDotsVertical className="" />
        </div>
      </div>
    </div>
  )
}

export default ChatHeader