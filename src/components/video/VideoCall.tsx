import React, { useEffect, useRef } from 'react'

// import { FaMicrophone } from "react-icons/fa6";
// import { MdSend } from "react-icons/md";
const VideoCall = ({ localStream, remoteStream }: { localStream: MediaStream | null, remoteStream: MediaStream | null }) => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (localStream && localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        if (remoteStream && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    return (
        <div>
            {/* <h1>video Ccall</h1>
            <button onClick={() => dispatch(setCallStart(false))} className='px-3 py-2 border shadow-lg rounded-md mx-10 bg-gradient-to-r from-slate-400 to-red-500'>stop call</button> */}
            {localStream && (
                <video ref={localVideoRef} autoPlay muted width="200" height="150"></video>
            )}
            {remoteStream && (
                <video ref={remoteVideoRef} autoPlay width="400" height="300"></video>
            )}

        </div>
    )
}

export default React.memo(VideoCall)




// const VideoCall = () => {
//   return (

//     <div className="mt-4 p-4 bg-black flex justify-between items-center">
//       <div className="flex space-x-2">
//         <span className="bg-green-500 p-2 rounded-full">
//         </span>
//         <span className="bg-red-500 p-2 rounded-full">
//         </span>
//         <span className="bg-gray-700 p-2 rounded-full">
//         </span>
//       </div>
//       <div className="flex-1 mx-4 bg-gray-700 rounded-lg p-2">
//         <input type="text" placeholder="Write message here" className="bg-gray-700 text-white w-full outline-none" />
//       </div>
//       <div className="flex space-x-2">
//         <button className="bg-blue-500 p-2 rounded-full">
//           <i className="fas fa-paper-plane"></i>
//           <MdSend title="send" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VideoCall;
