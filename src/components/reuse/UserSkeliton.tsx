const UserSkeliton = () => {
    return (
        <section className="singleusers w-full grid grid-cols-5 p-3 gap-1">
            <div className="col-span-1 flex justify-center skeleton-profile"></div>
            <div className={`${true === true ? "col-span-2" : "col-span-3"} skeleton-info`}>
                <div className="skeleton-name"></div>
                <div className="skeleton-lastmsg"></div>
            </div>
            <div className={`${true === true ? "col-span-2" : "col-span-1"} flex flex-col skeleton-admin`}>
                <div className="skeleton-time"></div>
                <div className="skeleton-unread"></div>
                <div className={`${true === true ? "block" : "hidden"} skeleton-admin-tag`}></div>
            </div>
        </section>
    );
}

export default UserSkeliton
