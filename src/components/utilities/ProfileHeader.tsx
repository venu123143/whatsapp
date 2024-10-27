
import { AppDispatch, RootState } from "../../Redux/store";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { handleProfileOpen } from "../../Redux/reducers/utils/utilReducer"
import { toggleContacts } from "../../Redux/reducers/utils/Features"
import { FaRegUserCircle } from "react-icons/fa";
import { logout } from "../../Redux/reducers/Auth/AuthReducer"
import { useContext, useState } from "react";
import { FaCircleChevronDown } from "react-icons/fa6";
import { BiAnalyse } from "react-icons/bi";
import { SocketContext, CallsContext } from "../../App";
import useCloseDropDown from "../reuse/CloseDropDown";
import { handleSetAllUsersChat } from "../../Redux/reducers/msg/MsgReducer";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch();
    const socket = useContext(SocketContext)
    const callsocket = useContext(CallsContext)
    const [isToggled, setIsToggled] = useState(false);

    const { user } = useSelector((state: RootState) => state.auth)
    const { profileOpen } = useSelector((state: RootState) => state.utils);
    const [dropdown, setDropdown] = useCloseDropDown(false, '.dropdown')

    const handleToggle = () => {
        setIsToggled(!isToggled); // Toggle the state
    };

    console.log(isToggled);
    const handleLogout = () => {
        dispatch(logout())
        dispatch(handleSetAllUsersChat([]))
        setDropdown(false)
        if (socket.connected) {
            socket.disconnect();
            socket.close();
        }
        if (callsocket.connected) {
            callsocket.disconnect();
            callsocket.close();
        }
    }

    const openProfile = () => {
        dispatch(handleProfileOpen(!profileOpen))
        setDropdown(false)
    }

    const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // Prevent the click event from reaching the document body
        event.stopPropagation();
        setDropdown(!dropdown);
    };
    return (
        // fixed z-0 w-3/12 top-0 left-0
        <section className="">
            <div className="profileheader">
                <div className="cursor-pointer">
                    {
                        user?.profile === "" || !user?.profile ? (
                            <div onClick={() => dispatch(handleProfileOpen(!profileOpen))} className="">
                                <FaRegUserCircle size={40} className="text-black bg-white hover:bg-opacity-80 rounded-full sm:cursor-pointer " />
                            </div>
                        ) :
                            <img onClick={() => dispatch(handleProfileOpen(!profileOpen))} src={user?.profile} className="object-cover sm:cursor-pointer hover:bg-black rounded-full w-[40px] h-[40px]" alt="Profile" />
                    }
                </div>
                <div className=" flex items-center gap-2">
                    <div className="icons p-3" onClick={() => navigate('/status')}>
                        <BiAnalyse className=" z-0" size={25} title="Status" />
                    </div>
                    <div className="icons" onClick={() => dispatch(toggleContacts(true))}>
                        <BsFillChatLeftTextFill title="New Chat" />
                    </div>
                    <div className="icons" onClick={handleDropdownClick}>
                        <BsThreeDotsVertical title="Menu" />
                    </div>
                </div>
                {
                    <div className={`${dropdown ? "scale-y-100 opacity-100  duration-200 shadow-lg rounded-sm delay-75 translate-x-0 no-scrollbar" : "scale-y-0 translate-x-0 duration-100 w-0 opacity-0"}  transition-all  ease-in-out origin-top-right  dropdown z-10 top-16 right-10 `}>
                        <div className="" >
                            <button onClick={openProfile} className="options " role="menuitem" id="menu-item-0">Profile</button>
                            <button className="options" role="menuitem" id="menu-item-1">
                                <span>Theme</span>
                                <FaCircleChevronDown className="inline font-Rubik" />
                            </button>
                            <button className="flex options items-center justify-between w-full  p-2 ">
                                <span>Notification</span>
                                <label className="relative inline-flex items-center cursor-pointer switch">
                                    <input
                                        type="checkbox"
                                        checked={isToggled}
                                        onChange={handleToggle} // Update state on change
                                        className="sr-only peer"
                                    />
                                    <div className="slider"></div>
                                </label>
                            </button>

                            <button onClick={handleLogout} className="options" role="menuitem" id="menu-item-0">Logout</button>
                        </div>
                    </div>
                }
            </div>
        </section>
    );
};

export default ProfileHeader;
