import React from "react"
import { FaCircleUser } from "react-icons/fa6"
import { formatDate } from "./ReUseFunc"
import { maskPhoneNumber } from "../cards/ReUseFunc"
import { IoCall } from "react-icons/io5"

const UserCard: React.FC<{ value?: any, contacts?: boolean, handleOnClick?: any, isAdmin?: boolean, startCall?: boolean; }> = ({ value, contacts, handleOnClick, isAdmin, startCall }) => {
  return (
    <>
      <section onClick={handleOnClick} className="singleuser w-full grid grid-cols-5 p-3  gap-1">
        <div className="col-span-1 flex justify-center ">
          {value?.profile ? (
            <img src={value.profile} alt="profile image" className="rounded-full h-[50px] w-[50px] object-cover" />
          ) : (
            <FaCircleUser size={50} className="text-slate-400" />
          )}
        </div>
        <div className={`${isAdmin === true ? "col-span-2" : "col-span-3"}`}>
          {
            contacts === true ?
              <>
                <h3 className="username">{value?.name ? value?.name : maskPhoneNumber(value?.mobile as string)}</h3>
                <p className="lastmsg">{value?.about}</p>
              </>

              :
              <>
                <h3 className="username">{Number(value?.display_name) ? maskPhoneNumber(value?.display_name as string) : value?.display_name}</h3>
                <p className="lastmsg">{value?.lastMessage?.message}</p>
              </>
          }
        </div>
        <div className={`${isAdmin === true ? "col-span-2 " : "col-span-1 justify-between"}  flex flex-col `}>
          <div className="">
            <span className={value?.unreadCount !== 0 ? "time text-[#02a698] " : "time"}>
              {value?.lastMessage?.date && formatDate(value?.lastMessage?.date) === 'Today' ?
                new Date(value?.lastMessage?.date).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  hour12: true,
                  minute: "numeric",
                })
                : value?.lastMessage?.date && formatDate(value?.lastMessage?.date)
              }
            </span>
            <div className={`${!contacts && startCall ? "animate-ring" : "hidden"} `}>
              <IoCall className="text-green-500" size={24} />
            </div>
          </div>
          {value?.unreadCount !== 0 && contacts !== true ? (
            <div className="unreadmessage">
              {value?.unreadCount}
            </div>
          ) : null}
          <div className={`${isAdmin === true ? " block " : "hidden"} self-end px-1 w-fit text-[.71rem] rounded-sm bg-[#2a3942] text-[#aebac1]`}>Group Admin</div>
        </div>

      </section >
    </>
  )
}

export default UserCard