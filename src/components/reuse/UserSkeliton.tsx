const UserSkeliton = () => {
    return (
        <section className="border-b  w-full grid grid-cols-5 p-3 gap-5 rtl:space-x-reverse">
            <div className="col-span-1 flex justify-center  skeleton-profile"></div>
            <div className={`${true === true ? "col-span-2" : "col-span-3"}`}>
                <div className=" singleusers skeleton-name"></div>
                <div className=" singleusers skeleton-lastmsg"></div>
            </div>
            <div className={`${true === true ? "col-span-2" : "col-span-1"} flex justify-center items-start flex-col`}>
                <div className=" skeleton-time"></div>
                {/* <div className="skeleton-unread"></div> */}
                <div className={`${true === true ? "block" : "hidden"} skeleton-admin-tag`}></div>
            </div>
        </section>
    );
}

export default UserSkeliton
