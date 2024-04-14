const UserSkeliton = () => {
    return (
        <section className="border-b  w-full  grid grid-cols-5  px-3 py-2">
            <div className="col-span-1 flex justify-center  skeleton-profile"></div>
            <div className={`${true === true ? "col-span-2 space-y-2" : "col-span-3"}`}>
                <div className=" skeleton w-[70%]"></div>
                <div className=" skeleton w-[100%]"></div>
            </div>
            <div className="pl-5">
                <div className={`${true === true ? "col-span-2 space-y-2 " : "col-span-1"}`}>
                    <div className="skeleton w-[120%] "></div>
                    <div className={`${true === true ? "block" : "hidden"} skeleton w-[100px]`}></div>
                </div>
            </div>
        </section>
    );
}

export default UserSkeliton
