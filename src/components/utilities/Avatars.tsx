import React from "react";

const Avatars = ({ urls }: { urls?: string[] }) => {
    console.log(urls)
    return (
        // <div className="">
        <div className="flex items-end justify-center">
            <div className="h-[40px] w-[40px] rounded-full border-4 border-white dark:border-dark-3">
                <img
                    src="https://cdn.tailgrids.com/2.2/assets/core-components/images/avatar/image-01.jpg"
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover object-center"
                />
            </div>
            <div className="-ml-4 h-[40px] w-[40px] rounded-full border-4 border-white dark:border-dark-3">
                <img
                    src="https://cdn.tailgrids.com/2.2/assets/core-components/images/avatar/image-02.jpg"
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover object-center"
                />
            </div>
            <div className="-ml-4 h-[40px] w-[40px] rounded-full border-4 border-white dark:border-dark-3">
                <img
                    src="https://cdn.tailgrids.com/2.2/assets/core-components/images/avatar/image-03.jpg"
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover object-center"
                />
            </div>
            <div className="-ml-4 h-[40px] w-[40px] rounded-full border-4 border-white dark:border-dark-3">
                <img
                    src="https://cdn.tailgrids.com/2.2/assets/core-components/images/avatar/image-04.jpg"
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover object-center"
                />
            </div>
            <div className="-ml-4 h-[40px] w-[40px] rounded-full border-4 border-white dark:border-dark-3">
                <img
                    src="https://cdn.tailgrids.com/2.2/assets/core-components/images/avatar/image-05.jpg"
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover object-center"
                />
            </div>
        </div>
        // </div>
    )
}

export default React.memo(Avatars)