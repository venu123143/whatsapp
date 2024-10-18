import React from "react"
import { AppDispatch, RootState } from "../../Redux/store"
import { useSelector, useDispatch } from "react-redux"
import { AiOutlineArrowLeft, AiOutlineCamera, } from "react-icons/ai"
import { handleProfileOpen, } from "../../Redux/reducers/utils/utilReducer"
import { upateUser, uploadProfile } from "../../Redux/reducers/Auth/AuthReducer"
import { handleNameEditClick, handleAboutEditClick, handleAboutChange, handleNameChange, openfullScreen } from "../../Redux/reducers/utils/Features"
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai"
import { ClipLoader } from "react-spinners"
import Dropzone from 'react-dropzone'
import { toast } from "react-toastify";
import { HiOutlineCamera } from "react-icons/hi";

import { PiUserLight } from "react-icons/pi"
import { useState } from "react"
import useCloseDropDown from "../reuse/CloseDropDown"
const Profile = () => {
  const dispatch: AppDispatch = useDispatch()

  const { user, isLoading, isSuccess, isProfileLoading } = useSelector((state: RootState) => state.auth)
  const { profileOpen } = useSelector((state: RootState) => state.utils)
  const { nameEditClick, aboutEditClick, userName, about } = useSelector((state: RootState) => state.features);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [showOptions, setShowOptions] = useCloseDropDown(false, '.dropdown')
  const editAbout = () => {
    dispatch(handleAboutEditClick({ aboutEditClick: !aboutEditClick, about: user?.about }))
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

  const showAllOptions = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setShowOptions(!showOptions)
    const { clientX, clientY } = event;
    setDropdownPosition({ top: clientY, left: clientX });
  }

  // options functions.
  const ShowFullImage = () => {
    setShowOptions(false)
    dispatch(openfullScreen({ images: user?.profile, currentImage: user?.profile, isFullscreen: true, zoomLevel: 1, currentIndex: 0 }))
  }
  const uploadProfileImage = (e: any) => {
    setShowOptions(false);
    const formData = new FormData();
    formData.append('images', e.target.files[0]);
    toast.info("Your profile is uploading...", {
      position: 'top-right'
    });
    dispatch(uploadProfile({ images: formData, _id: user?._id }))
  }

  const removeProfile = () => {
    setShowOptions(false);
    dispatch(upateUser({ id: user?._id as string, value: { profile: "" } }))
  }
  return (
    <>
      <div className={`h-screen overflow-y-scroll custom-scrollbar absolute top-0 left-0 w-full header-bg transition-all ease-linear  duration-300 delay-150 ${profileOpen === true ? "-translate-x-full  z-20" : ""}`}>
        <div className="flex items-center gap-4 w-full h-20 p-3 sm:cursor-pointer" onClick={() => dispatch(handleProfileOpen(!profileOpen))}>
          <AiOutlineArrowLeft className="text-white sm:cursor-pointer w-9" />
          <h1 className="text-white font-[400] ">Profile</h1>
        </div>
        <div className="profile">
          <div className={` transition-all ease-linear duration-200 delay-500 ${profileOpen === true ? "scale-0" : "scale-100"} flex justify-center`}>
            <div className=" rounded-full">
              <div className="">
                {
                  user?.profile === "" || !user?.profile ? (
                    <Dropzone multiple={false} onDrop={acceptedFiles => {
                      const formData = new FormData();
                      formData.append('images', acceptedFiles[0]);
                      toast.info("Your profile is uploading...", {
                        position: 'top-right'
                      })
                      dispatch(uploadProfile({ images: formData, _id: user?._id })).then(() => {
                        if (isSuccess) {
                          handleProfileOpen(false)
                        }
                      })
                      // setSelectedImage(acceptedFiles)
                    }}>
                      {({ getRootProps, getInputProps }) => (
                        <label htmlFor="dropzone-file" {...getRootProps()} className=" rounded-full group">
                          <PiUserLight size={200} className=" bg-gray-700 rounded-full sm:cursor-pointer hover:opacity-90 hover:shadow-orange-500 shadow-lg hover:bg-gray-700 mt-10" />
                          <div className={`${isLoading === true ? "block" : "hidden"} sm:cursor-pointer mt-5 group-hover:block absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 items-center`}>
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
                                <AiOutlineCamera className="text-white " size={40} />
                            }

                          </div>
                          <input {...getInputProps()} accept=".jpg, .jpeg, .png" />
                        </label>
                      )}
                    </Dropzone>
                  ) : (
                    <>
                      <img onClick={showAllOptions} src={user?.profile} className={` ${isLoading === true ? "bg-black opacity-50" : ""} group sm:cursor-pointer hover:bg-black hover:opacity-50 rounded-full h-[200px] w-[200px] object-cover mt-10`} alt="Profile" />
                      <div className={`${isProfileLoading === true ? "block" : "hidden"} sm:cursor-pointer mt-5 group-hover:block absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 items-center`}>
                        {
                          isProfileLoading &&
                          <ClipLoader
                            color="#36d7b7"
                            loading={isProfileLoading}
                            aria-label="Loading Spinner"
                            speedMultiplier={.71}
                            data-testid="loader"
                          />
                        }
                      </div>
                    </>
                  )
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
                    <AiOutlineCheck size={25} className="text-white mr-6 sm:cursor-pointer w-6" onClick={updateUserDb} />
                }
              </div>)
            ) : (
              <div className={`${user?.name === "" ? "border border-dashed border-white" : "bg-slate-800 rounded-md bg-opacity-50 px-2 py-3"} flex justify-between items-center mt-4`}>
                <p className="text-white  ">{user?.name}</p>
                <AiOutlineEdit size={25} className="text-white mr-4 sm:cursor-pointer" onClick={editNames} />
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
                    <AiOutlineCheck size={25} className="text-white mr-6 sm:cursor-pointer w-6" onClick={updateAboutDb} />
                }
              </div>
            ) : (
              <div className={`${user?.about === "" ? "border border-dashed border-white" : "bg-slate-800 rounded-md bg-opacity-50 px-2 py-3"} flex justify-between  items-center mt-4`}>
                <p className="text-white">{user?.about}</p>
                <AiOutlineEdit size={25} className="text-white mr-4 sm:cursor-pointer" onClick={editAbout} />
              </div>
            )
            }
          </div>
        </div>
      </div>
      {
        showOptions && (
          <div className="dropdown" style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
            <div className="" >
              <button onClick={ShowFullImage} className="options " role="menuitem" id="menu-item-0">View Photo</button>
              <button className="options" role="menuitem" id="menu-item-1">
                <span>Take Photo</span>
                <HiOutlineCamera size={25} className="inline font-Rubik" />
              </button>
              <input id="uploadImage" multiple={false} type="file" accept=".jpg, .jpeg, .png" className="hidden"
                onChange={uploadProfileImage} />
              <label htmlFor="uploadImage" role="menuitem" className="options sm:sm:cursor-pointer">Upload Photo</label>
              <button onClick={removeProfile} className="options" role="menuitem" id="menu-item-0">Remove Photo</button>
            </div>

          </div>
        )
      }
    </>
  )
}

export default React.memo(Profile)