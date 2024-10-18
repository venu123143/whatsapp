
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Draggable from 'react-draggable';
import { MdFlipCameraAndroid } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";

import { FaPhoneSlash } from 'react-icons/fa';
import { MdOutlineMicOff } from "react-icons/md";
import { GoScreenFull } from "react-icons/go";
import { LuMessageSquare } from "react-icons/lu";
import { GoDeviceCameraVideo } from "react-icons/go";
import { LiaVideoSlashSolid } from "react-icons/lia";
import { PiUserLight } from 'react-icons/pi';
import CallChat from './CallChat';
import { Message } from '../interfaces/CallInterface';
import { BsRecordCircle } from "react-icons/bs";
import { toast } from 'react-toastify';

interface VideoCallProps {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    endCall: () => void;
    sendMessage?: (message: string) => void; // New prop for sending messages
    messages?: { sender: 'local' | 'remote', content: string }[]; // New prop for messages
    isFrontCamera?: boolean;
    handleCameraFlip?: () => void
}

const VideoCall: React.FC<VideoCallProps> =
    ({ localStream, remoteStream, endCall, sendMessage, messages, isFrontCamera, handleCameraFlip }) => {
        const [isChatOpen, setIsChatOpen] = useState(false);
        const chatRef = useRef<HTMLDivElement>(null);
        const containerRef = useRef<HTMLDivElement>(null);
        const [isDragging, setIsDragging] = useState(false);

        const [isAudioMuted, setIsAudioMuted] = useState(false);
        const [isVideoMuted, setIsVideoMuted] = useState(false);
        const [viewType, setViewType] = useState<'grid' | 'popup'>('grid');
        const [isFullscreen, setIsFullscreen] = useState(false);
        const [currentMessage, setCurrentMessage] = useState('');

        const [isRecStarted, setIsRecStarted] = useState(false);
        const mediaRecorderRef = useRef<MediaRecorder | null>(null);
        const recordedChunksRef = useRef<Blob[]>([]);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
                    setIsChatOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);


        useEffect(() => {
            if (localStream) {
                const videoTrack = localStream.getVideoTracks()[0];
                if (videoTrack) {
                    // Update the video track constraints based on isFrontCamera
                    videoTrack.applyConstraints({
                        facingMode: isFrontCamera ? 'user' : 'environment'
                    });
                }
            }
        }, [isFrontCamera, viewType, localStream]);

        const startRecording = async () => {
            try {
                // Request screen capture
                const screenStream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: true
                });
                // Get system audio
                const audioStream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100
                    }
                });
                // Combine screen and audio streams
                const combinedStream = new MediaStream([
                    ...screenStream.getVideoTracks(),
                    ...audioStream.getAudioTracks()
                ]);

                mediaRecorderRef.current = new MediaRecorder(combinedStream, {
                    mimeType: 'video/webm;codecs=vp8,opus'
                });
                mediaRecorderRef.current.ondataavailable = (event) => {
                    if (event.data && event.data.size > 0) {
                        recordedChunksRef.current.push(event.data);
                    }
                };
                mediaRecorderRef.current.start(1000);
                setIsRecStarted(true);
                // // Stop recording when screen share is stopped
                screenStream.getVideoTracks()[0].onended = () => {
                    stopRecording();
                };
            } catch (error: any) {
                toast.error(`start record ${error.message}`, { position: "top-left" })
            }

        };

        const stopRecording = () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
                mediaRecorderRef.current.onstop = () => {
                    const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = `recording_${Date.now()}.webm`;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                    }, 100);
                    recordedChunksRef.current = [];
                    setIsRecStarted(false);
                };
            }
        };
        const handleSendMessage = () => {
            if (currentMessage.trim() !== "" && sendMessage) {
                sendMessage(currentMessage);
                setCurrentMessage('');
            }
        };


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

        const handleRecord = () => {
            setIsRecStarted(!isRecStarted)
            if (isRecStarted) {
                stopRecording()
            } else {
                startRecording()
            }
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
                        key={`${viewType}-${isFrontCamera}`}
                        url={stream}
                        playing
                        muted={isMuted}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: 0, left: 0, transform: isFrontCamera ? "scaleX(-1)" : "scaleX(1)" }}
                    />
                );
            } else {
                return (
                    <div onDoubleClick={toggleFullScreen} className="flex items-center justify-center w-full h-full bg-gray-800">
                        <PiUserLight size={180} className="text-gray-400 hover:text-gray-300 transition-colors duration-300" />
                    </div>
                );
            }
        };
        const background = new Array(10).fill(0)
        return (
            <div ref={containerRef} className="overflow-hidden scroll-smooth custom-scrollbar relative h-screen w-screen">
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
                    <button onClick={handleRecord}>
                        {
                            isRecStarted ? <FaRegStopCircle title='Stop recording' className='text-white hidden md:block hover:text-red-400 transition-all' size={28} /> :
                                <BsRecordCircle title='Start recording' className='text-white hidden md:block transition-all hover:text-green-500' size={28} />
                        }
                    </button>
                </div>
                {isRecStarted && <div className="absolute flex justify-center items-center text-white font-Rubik z-10 top-5 left-5 rsor-pointer shadow-lg recording-container">
                    <div className="recording-indicator">
                        <div className="pulse"></div>
                    </div>
                    <span>REC</span>
                </div>}
                <div className="absolute top-0 left-0 area">
                    <ul className="circles">
                        {background.map((_, index) => <li key={index}></li>)}
                    </ul>
                </div>

                {viewType === 'grid' && (
                    <div className="flex flex-col md:grid md:grid-cols-2 md:gap-2 w-full h-full">
                        <div className="relative flex-1 h-1/2 md:h-auto overflow-hidden rounded">
                            {renderVideoOrPlaceholder(remoteStream, false, false)}
                        </div>
                        <div className="relative flex-1 h-1/2 md:h-auto overflow-hidden rounded">
                            {renderVideoOrPlaceholder(localStream, true, true)}
                        </div>
                    </div>
                )}
                {viewType === 'popup' && (
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
                                ${isDragging ? 'scale-110 shadow-lg shadow-green-500' : 'shadow-slate-300'}
                                cursor-move`}>
                                {localStream && (
                                    <ReactPlayer
                                        style={{ transform: isFrontCamera ? "scaleX(-1)" : "scaleX(1)" }}
                                        url={localStream}
                                        playing
                                        muted
                                        width="100%"
                                        height="100%"
                                    />
                                )}
                            </div>
                        </Draggable>
                    </div>
                )}

                <div onClick={toggleFullScreen} className="absolute right-6 top-5 cursor-pointer shadow-lg">
                    <GoScreenFull title='Fullscreen' className="text-white font-[450]" size={30} />
                </div>

                {/* Control buttons */}
                <div className="absolute flex flex-row sm:w-auto space-x-4 bottom-4 left-1/2 transform -translate-x-1/2">
                    <button className={`icons bg-black text-green-500`} onClick={toggleVideo}>
                        {isVideoMuted ? <LiaVideoSlashSolid size={28} title='Show video' /> : <GoDeviceCameraVideo title='Stop video' size={28} />}
                    </button>
                    <button className={`icons bg-black text-green-500`} onClick={toggleAudio}>
                        {isAudioMuted ? (
                            <MdOutlineMicOff title='Unmute audio' size={28} />
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
                    <button className={`icons bg-black text-green-500`} onClick={handleCameraFlip}>
                        <MdFlipCameraAndroid title='Flip camera' className={`${isFrontCamera ? "rotate-180" : ""} duration-150 text-green-500 transition-all `} size={28} />
                    </button>
                    <button onClick={endCall} className="bg-black icons">
                        <FaPhoneSlash title='End call' size={28} className="text-red-500" />
                    </button>
                    <button onClick={() => setIsChatOpen(!isChatOpen)}
                        className="icons bg-black">
                        <LuMessageSquare size={28} title="chat" className="text-green-500" />
                    </button>
                </div>

                <CallChat chatRef={chatRef} isChatOpen={isChatOpen} messages={messages as Message[]} currentMessage={currentMessage} handleSendMessage={handleSendMessage} setCurrentMessage={setCurrentMessage} />
            </div>
        );
    };

export default React.memo(VideoCall);
