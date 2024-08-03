
import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Draggable from 'react-draggable';

import { FaDesktop, FaPhoneSlash } from 'react-icons/fa';
import { IoShareOutline } from 'react-icons/io5';
import { MdOutlineMicOff } from "react-icons/md";
import { GoScreenFull } from "react-icons/go";
import { LuMessageSquare } from "react-icons/lu";
import { GoDeviceCameraVideo } from "react-icons/go";
import { LiaVideoSlashSolid } from "react-icons/lia";
import { PiUserLight } from 'react-icons/pi';

interface VideoCallProps {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    endCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ localStream, remoteStream, endCall }) => {
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [viewType, setViewType] = useState<'grid' | 'popup'>('grid');
    const [isFullscreen, setIsFullscreen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const [isDragging, setIsDragging] = useState(false);
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

    const toggleFullScreen = () => {
        if (!containerRef.current) return;

        if (!isFullscreen) {
            if (containerRef.current.requestFullscreen) {
                containerRef.current.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };
    const renderVideoOrPlaceholder = (stream: MediaStream | null, isMuted: boolean, isLocal: boolean) => {
        if (stream && (!isLocal || !isVideoMuted)) {
            return (
                <ReactPlayer
                    url={stream}
                    playing
                    muted={isMuted}
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                />
            );
        } else {
            return (
                <div className="flex items-center justify-center w-full h-full bg-gray-800">
                    <PiUserLight size={180} className="text-gray-400 hover:text-gray-300 transition-colors duration-300" />
                </div>
            );
        }
    };

    return (
        <div ref={containerRef} className="bg-[#000] overflow-hidden h-screen w-screen">
            <div className="absolute top-4 left-[50%] -translate-x-[50%] gap-5 z-10 justify-center items-center flex">
                <button
                    onClick={() => setViewType('grid')}
                    className={`view-type-button flex-grow ${viewType === 'grid' ? 'active' : ''}`}
                >
                    Grid View
                </button>
                <button
                    onClick={() => setViewType('popup')}
                    className={`view-type-button min-w-[110px] ${viewType === 'popup' ? 'active' : ''}`}
                >
                    Popup View
                </button>
            </div>


            {viewType === 'grid' ? (
                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-2 w-full h-full">
                    <div className="relative flex-1 h-1/2 md:h-auto overflow-hidden rounded">
                        {renderVideoOrPlaceholder(localStream, false, false)}
                    </div>
                    <div className="relative flex-1 h-1/2 md:h-auto overflow-hidden rounded">
                        {renderVideoOrPlaceholder(remoteStream, true, true)}
                    </div>
                </div>
            ) : (
                <div className="relative w-full h-full">
                    <div className="">
                        {renderVideoOrPlaceholder(remoteStream, false, false)}
                    </div>
                    <Draggable
                        bounds="parent"
                        onStart={() => setIsDragging(true)}
                        onStop={() => setIsDragging(false)}
                    >
                        <div
                            className={`rounded-lg rounded-s-sm shadow-md absolute bottom-1 right-1 w-[40%] md:w-[20%] h-auto 
                                transition-all duration-300 ease-in-out
                                ${isDragging ? 'scale-110 shadow-lg shadow-green-500' : 'shadow-slate-300'}
                                cursor-move`}>
                            {renderVideoOrPlaceholder(localStream, true, true)}
                        </div>
                    </Draggable>
                </div>
            )}

            <div onClick={toggleFullScreen} className="absolute right-6 top-5 cursor-pointer shadow-lg">
                <GoScreenFull className="text-white font-[450]" size={30} />
            </div>

            {/* Control buttons */}
            <div className="absolute flex flex-row sm:w-auto space-x-4 bottom-4 left-1/2 transform -translate-x-1/2">
                <button className={`icons bg-black text-green-500`} onClick={toggleVideo}>
                    {isVideoMuted ? <LiaVideoSlashSolid size={28} /> : <GoDeviceCameraVideo size={28} />}
                </button>
                <button className={`icons bg-black text-green-500`} onClick={toggleAudio}>
                    {isAudioMuted ? (
                        <MdOutlineMicOff size={28} />
                    ) : (
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
                    )}
                </button>
                <button className={`icons bg-black text-green-500`} onClick={toggleScreenShare}>
                    {isScreenSharing ? (
                        <FaDesktop className="text-green-500" size={28} />
                    ) : (
                        <IoShareOutline className="text-green-500" size={28} />
                    )}
                </button>
                <button onClick={endCall} className="bg-black icons">
                    <FaPhoneSlash size={28} className="text-red-500" />
                </button>
                <button className="icons bg-black">
                    <LuMessageSquare size={25} title="chat" className="text-green-500" />
                </button>
            </div>
        </div>
    );
};

export default React.memo(VideoCall);
