import { FaCircleUser } from 'react-icons/fa6';
import { FiPhoneCall, FiPhoneMissed } from "react-icons/fi";

const IncomingCall = ({ imageUrl, rejectOnClick, acceptCall }: { imageUrl: string | null, rejectOnClick: () => void, acceptCall: () => void }) => {

    return (
        <div className="bg-gray-900 shadow-md hover:shadow-green-500 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-1 bg-gradient-to-r from-[#111b21] to-[#202c33]">
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
                        {imageUrl ? (
                            <div className="relative p-1">
                                <img src={imageUrl} alt="profile image" className="w-[40px] h-[40px] rounded-full object-cover" />
                            </div>
                        ) : (
                            <div className="relative p-1">
                                <FaCircleUser size={40} className="text-slate-400" />
                            </div>
                        )}
                    </div>
                    <p className="text-white font-semibold">Incoming call</p>
                </div>
                <div className="flex items-center">
                    <button onClick={acceptCall} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-2">
                        <FiPhoneCall className="" size={24} />
                    </button>
                    <button onClick={rejectOnClick} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                        <FiPhoneMissed size={25} className='' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IncomingCall;