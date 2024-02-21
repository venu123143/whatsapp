import React from "react"
import { FaCircleUser } from "react-icons/fa6"
import { CommonProperties } from "../../Redux/reducers/msg/MsgReducer"
import { formatDate } from "./ReUseFunc"
const UserCard: React.FC<{ value?: CommonProperties, contacts?: boolean, unreadCount?: number, handleOnClick?: any }> = ({ value, contacts, unreadCount, handleOnClick }) => {


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
        <div className="col-span-3">
          <h3 className="username">{value?.name ? value?.name : value?.mobile}</h3>
          <p className="lastmsg">{contacts === true ? value?.about : value?.lastMessage?.message}</p>
        </div>
        <div className="col-span-1 flex flex-col justify-between">
          <div>
            <span className={unreadCount ? "time text-[#02a698] " : "time"}>
              {value?.lastMessage?.date && formatDate(value?.lastMessage?.date) === 'Today' ?
                new Date(value?.lastMessage?.date).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  hour12: true,
                  minute: "numeric",
                })
                : value?.lastMessage?.date && formatDate(value?.lastMessage?.date)
              }
            </span>
          </div>
          {unreadCount ? (
            <div className="unreadmessage">
              {unreadCount}
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}

export default UserCard