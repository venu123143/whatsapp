import React from 'react';

interface CustomInputProps {
    color: string;
    label: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ color, label, onChange, value, onBlur }) => {

    return (
        <div className="relative w-full min-w-[200px] h-10">
            <input onChange={onChange} value={value} onBlur={onBlur}
                className={`${color} border-gray-500  peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-500 placeholder-shown:border-t-gray-500 border focus:border-2 border-t-transparent focus:border-t-transparent text-md px-3 py-2.5 rounded-[7px]  `}
                placeholder=" " />
            <label
                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block 
                        before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 
                        after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-400  before:border-blue-gray-200 
                        after:border-gray-500 peer-focus:before:!border-teal-500  peer-focus:text-teal-500 peer-focus:after:!border-teal-500">
                {label}
            </label>
        </div>
    );
};

export default React.memo(CustomInput);
