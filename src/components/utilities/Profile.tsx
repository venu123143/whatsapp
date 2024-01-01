import { RootState } from "../../Redux/store"
import { useSelector, useDispatch } from "react-redux"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { handleProfileOpen, handleNameEditClick, handleAboutEditClick, handleAboutChange, handleNameChange } from "../../Redux/reducers/utils/utilReducer"
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai"
import img from "../../assets/profile.jpg"

const Profile = () => {
  const dispatch = useDispatch()
  const { profileOpen, nameEditClick, aboutEditClick, userName, about } = useSelector((state: RootState) => state.utils)
  const { socket } = useSelector((store: RootState) => store.features);
  const joinRoom = () => {
    dispatch(handleAboutEditClick(!aboutEditClick))
    socket.emit("join_room", about)

  }
  return (
    <>
      <div className={`absolute top-0 left-0 w-full header-bg transition-all ease-linear  duration-300 delay-150 ${profileOpen === true ? "-translate-x-full  z-20" : ""}`}>
        <div className="flex w-full items-center gap-4 mt-10 pb-4 ml-8 cursor-pointer" onClick={() => dispatch(handleProfileOpen(!profileOpen))}>
          <AiOutlineArrowLeft className="text-white cursor-pointer w-9" />
          <h1 className="text-white font-[400] ">Profile</h1>
        </div>
        <div className="profile">
          <div className={` transition-all ease-linear duration-200 delay-500 ${profileOpen === true ? "scale-0" : "scale-100"} flex justify-center`}>
            <div className=" rounded-full">
              <div className="">
                <img src={img} className="group cursor-pointer hover:bg-black hover:opacity-50 rounded-full h-[200px] w-[200px] mt-10" alt="Profile" />
                {/* <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 group-hover:flex flex-col justify-center z-10 text-gray-400 items-center">
                  <AiOutlineCamera className="" size={25} />
                  <span>change profile photo</span>
                </div> */}

              </div>
            </div>
          </div>
          <div className={`transition-all ease-linear  duration-200 delay-500  ${profileOpen === true ? "translate-y-12" : null} mt-7 ml-5 px-5`}>
            <p className="text-[#008069] ml-2">Your name</p>
            {nameEditClick ? (
              (<div className="flex justify-between items-center mt-4">
                <input type="text"
                  onChange={(e: any) => dispatch(handleNameChange(e.target.value))}
                  placeholder="Your Name"
                  value={userName}
                  className="profileinput" />
                <AiOutlineCheck size={25} className="text-white mr-6 cursor-pointer w-6" onClick={() => dispatch(handleNameEditClick(!nameEditClick))} />
              </div>)
            ) : (
              <div className={`${userName === "" ? "border border-dashed border-white" : "bg-slate-800 rounded-md bg-opacity-50 px-2 py-3"} flex justify-between items-center mt-4`}>
                <p className="text-white  ">{userName}</p>
                <AiOutlineEdit size={25} className="text-white mr-4 cursor-pointer" onClick={() => dispatch(handleNameEditClick(!nameEditClick))} />
              </div>
            )}
          </div>

          <div className={`transition-all ease-linear  duration-200 delay-500  ${profileOpen === true ? "translate-y-12" : null} mt-7 ml-5 px-5`}>
            <p className="text-[#008069] ml-2">About</p>
            {aboutEditClick ? (
              (<div className="flex justify-between items-center mt-4">
                <input type="text"
                  placeholder=" About"
                  onChange={(e: any) => dispatch(handleAboutChange(e.target.value))}
                  value={about}
                  className="profileinput" />
                <AiOutlineCheck  onClick={joinRoom} size={25} className="text-white mr-6 cursor-pointer w-6" />
              </div>)
            ) : (
              <div className={`${about === "" ? "border border-dashed border-white" : "bg-slate-800 rounded-md bg-opacity-50 px-2 py-3"} flex justify-between  items-center mt-4`}>
                <p className="text-white">{about}</p>
                <AiOutlineEdit size={25} className="text-white mr-4 cursor-pointer" onClick={() => dispatch(handleAboutEditClick(!aboutEditClick))} />
              </div>
            )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile