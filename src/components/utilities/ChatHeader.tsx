import { MdCall } from "react-icons/md"
import { IoMdVideocam } from "react-icons/io"
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import { FaCircleUser } from "react-icons/fa6"
import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import { RootState } from "../../Redux/store"
const ChatHeader = () => {
  // const [grpUsers, setGrpUsers] = useState("")
  // const { activeChat } = useSelector((store: RootState) => store.features) 
  const { currentUserIndex, friends } = useSelector((state: RootState) => state.msg)

  // function getUsersString(usersArray: any) {
  //   return usersArray.map((user: any) => user.name || user.mobile).join(', ');
  // }

  // useEffect(() => {
  //   // Check if 'users' array exists in currentUserorGroup
  //   if (friends[currentUserIndex]?.users!) {
  //     const usersString = getUsersString(currentUserorGroup.users);
  //     setGrpUsers(usersString);
  //   } else {
  //     setGrpUsers("");
  //   }
  // }, [currentUserIndex]);
  return (
    <div className="h-16 gap-5 px-4 py-3 flex justify-between items-center bg-[#202c33] ">
      <div className="flex items-center justify-center gap-6 chatList">
        {friends[currentUserIndex]?.profile ? (
          <img src={friends[currentUserIndex].profile} alt="profile image" className="w-[40px] h-[40px] rounded-full object-cover" />
        ) : (
          <FaCircleUser size={40} className="text-slate-400" />
        )}
      </div>
      <div className="mr-auto">
        <span className="username font-bold">{friends[currentUserIndex]?.name}</span>
        <span className="time text-sm  line-clamp-1">{friends[currentUserIndex]?.online_status === 'true' ? "online" : "offline"} </span>
      </div>
      <div className="flex gap-2 ">
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