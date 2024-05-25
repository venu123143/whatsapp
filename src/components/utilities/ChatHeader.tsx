// import { MdCall } from "react-icons/md"
import { IoMdVideocam } from "react-icons/io"
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../Redux/store"
import { FaCircleChevronDown, FaCircleUser } from "react-icons/fa6"
import { useEffect, useState } from "react"
import { setCurrentGrpOrUser, toggleContactInfo } from "../../Redux/reducers/msg/MsgReducer"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { maskPhoneNumber } from "../cards/ReUseFunc"
import { Link } from "react-router-dom"
// import { useSelector } from "react-redux"
// import { RootState } from "../../Redux/store"
const ChatHeader = () => {
  const [grpUsers, setGrpUsers] = useState("")
  const dispatch: AppDispatch = useDispatch()

  // const { activeChat } = useSelector((store: RootState) => store.features) 
  const { currentUserIndex, friends } = useSelector((state: RootState) => state.msg)
  // const { user } = useSelector((state: RootState) => state.auth)
  const [dropdown, setDropdown] = useState(false)

  function getUsersString(usersArray: any) {
    return usersArray.map((user: any) => user.name || maskPhoneNumber(user.mobile)).join(', ');
  }
  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      if (dropdown && !event.target || !(event.target as HTMLElement).closest('.dropdown')) {
        setDropdown(false);
      }
    };

    document.body.addEventListener('click', closeDropdown);

    return () => {
      document.body.removeEventListener('click', closeDropdown);
    };
  }, [dropdown]);
  useEffect(() => {
    // Check if 'users' array exists in currentUserorGroup
    if (friends[currentUserIndex]?.users?.length! > 0) {
      const usersString = getUsersString(friends[currentUserIndex]?.users);
      setGrpUsers(usersString);
    } else {
      setGrpUsers("");
    }
  }, [currentUserIndex]);

  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Prevent the click event from reaching the document body
    event.stopPropagation();
    setDropdown(!dropdown);
  };
  const handleCloseChat = () => {
    dispatch(setCurrentGrpOrUser(null))
    setDropdown(false);
  }
  const handleOopenProfile = () => {
    dispatch(toggleContactInfo(true))
  }

  const closeContact = () => {
    dispatch(toggleContactInfo(true))
  }
  return (
    <div className="h-16 gap-2 sm:gap-5 py-3 px-1 flex justify-between items-center bg-[#202c33] ">
      <div onClick={handleCloseChat} className="md:hidden block w-5 p-5">
        <AiOutlineArrowLeft className="text-white" />
      </div>
      <div onClick={handleOopenProfile} className="flex sm:cursor-pointer items-center justify-center gap-6 chatList">
        {friends[currentUserIndex]?.profile ? (
          <div className="relative p-1">
            <img src={friends[currentUserIndex].profile} alt="profile image" className="w-[40px] h-[40px] rounded-full object-cover" />
            {friends[currentUserIndex]?.online_status === "true" ? (
              <span className="blink_me absolute bottom-1 right-0"></span>
            ) : null}
          </div>
        ) : (
          <div className="relative p-1">
            <FaCircleUser size={40} className="text-slate-400" />
            {friends[currentUserIndex]?.online_status === "true" ? (
              <span className="blink_me absolute bottom-1 right-0"></span>
            ) : null}
          </div>
        )}
      </div>
      <div className="mr-auto sm:cursor-pointer" onClick={handleOopenProfile}>
        <span className="username font-bold">{friends[currentUserIndex]?.name ? friends[currentUserIndex]?.name : maskPhoneNumber(friends[currentUserIndex]?.mobile as string)}</span>
        <span className="time text-sm line-clamp-1 max-w-[600px]"> {grpUsers !== ""
          ? grpUsers
          : friends[currentUserIndex]?.online_status === "true"
            ? "online"
            : "offline"
        }</span>
      </div>
      <div className="flex gap-2 ">
        {/* <div className="icons sm:block hidden" >
          <MdCall className=" sm:cursor-pointer text-xl" title="audio call" />
        </div> */}
        {/* <Link to="/calls" className="icons">
          <IoMdVideocam className="" title="video call" />
        </Link> */}
        <Link to={`/calls`} target="_self" rel="noopener noreferrer" className="icons">
          <IoMdVideocam title="video call" />
        </Link>
        <div className="icons sm:block hidden" >
          <BsSearch className="" title="search in chat" />
        </div>
        <div onClick={handleDropdownClick} className="icons m-0 sm:block hidden">
          <BsThreeDotsVertical className="" title="settings" />
        </div>
      </div>

      <div className={`${dropdown ? "scale-y-100 opacity-100  duration-300 shadow-lg rounded-sm delay-75 translate-x-0 no-scrollbar" : "scale-y-0 translate-x-30 w-0 opacity-0"} no-scrollbar transition-all  ease-in-out origin-top-right  dropdown z-10 top-16 right-10 `}>
        <div className="">
          <button onClick={closeContact} className="options" role="menuitem" id="menu-item-0">Contact info</button>
          <button className="options" role="menuitem" id="menu-item-1">
            <span>Theme</span>
            <FaCircleChevronDown className="inline font-Rubik" />
          </button>
          <Link to="#" className="options">Clear Chat</Link>
          <button onClick={handleCloseChat} className="options" role="menuitem" id="menu-item-0">Close Chat</button>
        </div>
      </div>


    </div>
  )
}

export default ChatHeader