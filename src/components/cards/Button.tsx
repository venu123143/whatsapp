import React from 'react'
import { IoArrowForward } from "react-icons/io5";
import { ClipLoader } from 'react-spinners';
const Button = ({ type, text, isLoading }: { text: string, type: "button" | "reset" | "submit", isLoading: boolean }) => {
    return (
        <button type={type} style={{ boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px' }} className="relative md:cursor-pointer inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group">
            <span className="absolute shadow-lg bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                {isLoading ? <ClipLoader color="#36d7b7"
                    aria-label="Loading Spinner"
                    speedMultiplier={.71}
                    data-testid="loader" size={30} /> : <IoArrowForward size={25} className='text-green-400' />}
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <IoArrowForward size={25} className='text-green-400' />
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">
                {text}
            </span>
        </button>
    );
};

export default React.memo(Button);