
import { RootState } from "../../Redux/store";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { handleProfileOpen } from "../../Redux/reducers/utils/utilReducer"
import { toggleContacts } from "../../Redux/reducers/utils/Features"
import img from "../../assets/profile.jpg"


const ProfileHeader = () => {
    const dispatch = useDispatch();
    const { profileOpen } = useSelector((state: RootState) => state.utils);
    return (
        // fixed z-0 w-3/12 top-0 left-0
        <section className="">
            <div className="profileheader">
                <div className="cursor-pointer">
                    <img src={img} alt="profile" className="w-[40px] h-[40px] rounded-full bg-cover object-cover"
                        onClick={() => dispatch(handleProfileOpen(!profileOpen))}
                    />
                </div>
                <div className=" flex items-center gap-2">
                    <div className="icons" onClick={() => dispatch(toggleContacts(true))}>
                        <BsFillChatLeftTextFill title="New Chat" />
                    </div>
                    <div className="icons">
                        <BsThreeDotsVertical title="Menu" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileHeader;
