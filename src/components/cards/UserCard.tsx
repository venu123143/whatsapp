import React from "react"
import { FaCircleUser } from "react-icons/fa6"
import { Users } from "../../static/Static"
const UserCard: React.FC<{ value: Users }> = ({ value }) => {
  return (
    <>
      <section className="singleuser w-full grid grid-cols-5 p-3  gap-3">
        <div className="col-span-1 flex justify-center ">
          {value?.profile ? (
            <img src={value.profile} alt="" className="rounded-full h-[50px] w-[50px] object-cover" />
          ) : (
            <FaCircleUser size={50} className="text-slate-400" />
          )}
        </div>
        <div className="col-span-3 ">
          <h3 className="username">{value?.name}</h3>
          <p className="lastmsg">{value?.message}</p>
        </div>
        <div className="col-span-1 flex flex-col justify-between">
          <div>
            <span className={value.unreadCount ? "time text-[#02a698] ": "time"}>{value?.time}</span>
          </div>
          {value.unreadCount ? (
            <div className="unreadmessage">
              {value.unreadCount}
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}

export default UserCard