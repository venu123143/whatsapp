import { AppDispatch, RootState } from "../../Redux/store"
import { useSelector, useDispatch } from "react-redux"
import { AiOutlineArrowLeft, AiOutlineCamera, } from "react-icons/ai"
import { handleProfileOpen, } from "../../Redux/reducers/utils/utilReducer"
import { upateUser } from "../../Redux/reducers/Auth/AuthReducer"
import { handleNameEditClick, handleAboutEditClick, handleAboutChange, handleNameChange } from "../../Redux/reducers/utils/Features"
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai"
// import img from "../../assets/profile.jpg"
import { FaRegUserCircle } from "react-icons/fa";
import { ClipLoader } from "react-spinners"

const Profile = () => {
  const dispatch: AppDispatch = useDispatch()
  const { user, isLoading } = useSelector((state: RootState) => state.auth)
  const { profileOpen, } = useSelector((state: RootState) => state.utils)
  const { nameEditClick, aboutEditClick, userName, about } = useSelector((state: RootState) => state.features);
  const editAbout = () => {
    dispatch(handleAboutEditClick({ aboutEditClick: !aboutEditClick, about: user?.about }))
    // socket.emit("join_room", about)
  }
  const editNames = () => {
    dispatch(handleNameEditClick({ nameEditClick: !nameEditClick, name: user?.name }))
  }
  const updateAboutDb = () => {
    dispatch(upateUser({ id: user?._id as string, value: { about: about } }))
    dispatch(handleAboutEditClick({ aboutEditClick: !aboutEditClick }))
  }
  const updateUserDb = () => {
    dispatch(upateUser({ id: user?._id as string, value: { name: userName } }))
    dispatch(handleNameEditClick({ nameEditClick: !nameEditClick }))
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
                {
                  user?.profile === "" || !user?.profile ? (
                    <div className=" rounded-full group">
                      <FaRegUserCircle size={200} className="  bg-slate-300 rounded-full cursor-pointer hover:opacity-90 hover:bg-gray-700 mt-10" />
                      <div className="hidden cursor-pointer mt-5 group-hover:block absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 items-center">
                        <AiOutlineCamera className="text-white " size={40} />
                        {/* <span>change profile photo</span> */}
                      </div>
                    </div>
                  ) :
                    <img src={user?.profile} className="group cursor-pointer hover:bg-black hover:opacity-50 rounded-full h-[200px] w-[200px] mt-10" alt="Profile" />
                }
              </div>
            </div>
          </div>
          <div className={`transition-all ease-linear  duration-200 delay-500  ${profileOpen === true ? "translate-y-12" : null} mt-7 ml-5 px-5`}>
            <p className="text-[#008069] ml-2">Your name</p>
            {nameEditClick ? (
              (<div className="flex justify-between items-center mt-4 relative">
                <input type="text"
                  onChange={(e: any) => dispatch(handleNameChange(e.target.value))}
                  placeholder="Your Name"
                  value={userName}
                  className="profileinput" />
                {
                  isLoading === true ?
                    <ClipLoader
                      color="#36d7b7"
                      loading={isLoading}
                      aria-label="Loading Spinner"
                      speedMultiplier={.71}
                      data-testid="loader"
                    /> :
                    <AiOutlineCheck size={25} className="text-white mr-6 cursor-pointer w-6" onClick={updateUserDb} />
                }
              </div>)
            ) : (
              <div className={`${user?.name === "" ? "border border-dashed border-white" : "bg-slate-800 rounded-md bg-opacity-50 px-2 py-3"} flex justify-between items-center mt-4`}>
                <p className="text-white  ">{user?.name}</p>
                <AiOutlineEdit size={25} className="text-white mr-4 cursor-pointer" onClick={editNames} />
              </div>
            )}
          </div>

          <div className={`transition-all ease-linear  duration-200 delay-500  ${profileOpen === true ? "translate-y-12" : null} mt-7 ml-5 px-5`}>
            <p className="text-[#008069] ml-2">About</p>
            {aboutEditClick ? (
              <div className="flex justify-between items-center mt-4 ">
                <input type="text"
                  placeholder=" About"
                  onChange={(e: any) => dispatch(handleAboutChange(e.target.value))}
                  value={about}
                  className="profileinput" />
                {
                  isLoading === true ?
                    <ClipLoader
                      color="#36d7b7"
                      loading={isLoading}
                      aria-label="Loading Spinner"
                      speedMultiplier={.71}
                      data-testid="loader"
                    />
                    :
                    <AiOutlineCheck size={25} className="text-white mr-6 cursor-pointer w-6" onClick={updateAboutDb} />
                }
              </div>
            ) : (
              <div className={`${user?.about === "" ? "border border-dashed border-white" : "bg-slate-800 rounded-md bg-opacity-50 px-2 py-3"} flex justify-between  items-center mt-4`}>
                <p className="text-white">{user?.about}</p>
                <AiOutlineEdit size={25} className="text-white mr-4 cursor-pointer" onClick={editAbout} />
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