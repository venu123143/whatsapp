import React, { useEffect, useRef, useState } from 'react';
import { FaVideoSlash, FaDesktop, FaPhoneSlash } from 'react-icons/fa';
import { IoShareOutline } from 'react-icons/io5';
// import { drawWaveform, getAudioContext, getUserMedia } from './UseVideoCustom';
import { MdOutlineMicOff } from "react-icons/md";
import { GoScreenFull } from "react-icons/go";
import { LuMessageSquare } from "react-icons/lu";

const VideoCall = ({ localStream, remoteStream, endCall }: { localStream: MediaStream | null, remoteStream: MediaStream | null, endCall: () => void }) => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [viewType, setViewType] = useState('grid');

    // const waveformCanvasRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleDragStart = (e: any) => {
        setIsDragging(true);
        const rect = e.target.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const handleDrag = (e: any) => {
        if (isDragging) {
            const rect = e.target.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const videoWidth = rect.width;
            const videoHeight = rect.height;
            let newX = e.clientX - position.x;
            let newY = e.clientY - position.y;

            // // Ensure the video element stays within the screen boundaries
            newX = Math.max(0, Math.min(newX, windowWidth - videoWidth));
            newY = Math.max(0, Math.min(newY, windowHeight - videoHeight));

            e.target.style.left = `${newX}px`;
            e.target.style.top = `${newY}px`;
            e.target.style.right = `auto`;
            e.target.style.bottom = `auto`;
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };
    useEffect(() => {
        if (localStream && localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream, viewType]);

    useEffect(() => {
        if (remoteStream && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream, viewType]);

    const toggleAudio = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsAudioMuted(!audioTrack.enabled);
            }
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoMuted(!videoTrack.enabled);
            }
        }
    };

    const toggleScreenShare = () => {
        setIsScreenSharing(!isScreenSharing);
        // Implement screen sharing logic here
    };

    // const endCall = () => {
    //     // Implement end call logic here
    // };
    const toggleFullScreen = () => {
        if (remoteVideoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                remoteVideoRef.current.requestFullscreen().catch((err) => {
                    alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            }
        }
    };
    return (
        <div onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop} className="bg-[#000] overflow-hidden h-screen w-screen">
            <div className="absolute top-4 left-[50%] -translate-x-[50%] gap-5 z-10 justify-center items-center flex">
                <button
                    onClick={() => setViewType('grid')}
                    className={`view-type-button ${viewType === 'grid' ? 'active' : ''}`}
                >
                    Grid View
                </button>
                <button
                    onClick={() => setViewType('popup')}
                    className={`view-type-button ${viewType === 'popup' ? 'active' : ''}`}
                >
                    Popup View
                </button>
            </div>

            {viewType === 'grid' ? (
                <div className="grid bg-black grid-cols-2 gap-2 w-full h-full ">
                    <div className='relative overflow-hidden rounded aspect-w-16 aspect-h-9'>
                        {remoteStream && (
                            <video ref={remoteVideoRef}
                                className='absolute inset-0 w-full h-full object-cover shadow-gray-400 shadow-lg'
                                autoPlay
                            ></video>
                        )}
                    </div>
                    <div className='relative overflow-hidden rounded aspect-w-16 aspect-h-9'>
                        {localStream && (
                            <video ref={localVideoRef}
                                className='absolute inset-0 w-full h-full object-cover shadow-lg'
                                autoPlay
                            >
                            </video>
                        )}
                    </div>
                </div>
            ) : (
                <div className="relative w-full h-full">
                    <div className=''>
                        {remoteStream && (
                            <div className='' >
                                <video ref={remoteVideoRef} autoPlay
                                    className="w-full h-full object-cover rounded-lg"
                                ></video>
                            </div>
                        )}
                    </div>
                    <div className=''>
                        {localStream && (
                            <div className='' >
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    className="rounded-lg shadow-md absolute bottom-1 right-1 w-[20%] h-auto shadow-slate-300 sm:hover:cursor-pointer hover:shadow-green-500"
                                    draggable={true}
                                    onDragStart={(e) => handleDragStart(e)}
                                    onDragEnd={handleDragEnd}
                                    onDrag={(e) => handleDrag(e)}
                                ></video>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div onClick={toggleFullScreen} className='absolute right-6  top-5 cursor-pointer shadow-lg '>
                <GoScreenFull className='text-gray-500 hover:text-white font-[450]' size={30} />
            </div>
            <div className=" absolute bottom-4 left-2 flex space-x-2">
                <span className="bg-green-500 p-2 rounded-full">
                </span>
                <span className="bg-red-500 p-2 rounded-full">
                </span>
                <span className="bg-gray-700 p-2 rounded-full">
                </span>
            </div>
            <div className=" absolute space-x-4 gap-4 bottom-4 left-[50%] -translate-x-[50%] ">
                <button
                    className={`bg-gray-700 hover:bg-gray-600 hover:shadow-lg rounded-full p-2 ${isVideoMuted ? 'text-green-500' : 'text-green-500'
                        }`}
                    onClick={toggleVideo}
                >
                    {
                        isVideoMuted ?
                            <FaVideoSlash size={28} className='font-Rubik font-bold text-lg ' />
                            :
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>

                    }

                </button>
                <button
                    className={`bg-gray-700 cursor-pointer hover:shadow-lg hover:bg-gray-600 rounded-full p-2 ${isAudioMuted ? 'text-green-500' : 'text-green-500'
                        }`}
                    onClick={toggleAudio}
                >
                    {isAudioMuted ?
                        <MdOutlineMicOff size={28} />
                        :
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                        </svg>
                    }
                </button>
                <button
                    className={`bg-gray-700 hover:bg-gray-600 hover:shadow-lg rounded-full p-2 ${isScreenSharing ? 'text-green-500' : ''
                        }`}
                    onClick={toggleScreenShare}>
                    {
                        isScreenSharing ? <FaDesktop className='text-green-500' size={28} />
                            :
                            <IoShareOutline className='text-green-500' size={28} />

                    }
                </button>
                <button onClick={endCall} className="control-button end-call">
                    <FaPhoneSlash size={28} />
                </button>
                <button className='p-2 bg-gray-700 hover:bg-gray-600 rounded-full'>
                    <LuMessageSquare size={25} title='chat' className=' text-green-500' />
                </button>
            </div>
        </div >
    );
};

export default React.memo(VideoCall);