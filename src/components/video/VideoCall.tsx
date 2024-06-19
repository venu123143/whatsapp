import React, { useEffect, useRef, useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaPhoneSlash } from 'react-icons/fa';
import { drawWaveform, getAudioContext, getUserMedia } from './UseVideoCustom';


const VideoCall = ({ localStream, remoteStream }: { localStream: MediaStream | null, remoteStream: MediaStream | null }) => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [viewType, setViewType] = useState('grid'); // "grid" or "popup"

    const waveformCanvasRef = useRef(null);
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);
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

    const toggleAudio = () => {
        setIsAudioMuted(!isAudioMuted);
        // Implement audio mute/unmute logic here
    };

    const toggleVideo = () => {
        setIsVideoMuted(!isVideoMuted);
        // Implement video mute/unmute logic here
    };

    const toggleScreenShare = () => {
        setIsScreenSharing(!isScreenSharing);
        // Implement screen sharing logic here
    };

    const endCall = () => {
        // Implement end call logic here
    };

    // useEffect(() => {
    //     const initAudio = async () => {
    //         const audioCtx = await getAudioContext();
    //         setAudioContext(audioCtx);

    //         const stream = await getUserMedia({ audio: true });
    //         const source = audioCtx.createMediaStreamSource(stream);
    //         const analyser = audioCtx.createAnalyser();
    //         source.connect(analyser);
    //         setAnalyser(analyser);

    //         const animate = () => {
    //             drawWaveform(analyser, waveformCanvasRef.current);
    //             requestAnimationFrame(animate);
    //         };
    //         animate();
    //     };

    //     initAudio();
    // }, []);

    return (
        <div className="video-call-container h-screen">
            <div className="absolute z-10  top-3 view-type-buttons space-x-3">
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
                <div className="video-grid">
                    <div>
                        {remoteStream && (
                            <video ref={remoteVideoRef} autoPlay></video>
                        )}
                    </div>
                    <div>
                        {localStream && (
                            <video ref={localVideoRef} autoPlay muted></video>
                        )}
                    </div>
                </div>
            ) : (
                <div className="video-popup">
                    <div>
                        {remoteStream && (
                            <div className='h-screen overflow-hidden no-scrollbar' >
                                <video ref={localVideoRef} autoPlay muted className="w-full"></video>
                                <div className="controls absolute botom-0 right-0">
                                    <canvas ref={waveformCanvasRef} className="waveform-canvas"></canvas>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        {localStream && (
                            <div className='h-screen overflow-hidden' >
                                <video ref={localVideoRef} autoPlay muted className="w-full local"></video>
                                <div className="controls absolute botom-0 right-0">
                                    {/* Other control buttons */}
                                    <h1 className='bg-red-500'>hello</h1>
                                    <canvas ref={waveformCanvasRef} className="waveform-canvas"></canvas>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="controls">
                <button
                    onClick={toggleAudio}
                    className={`control-button ${isAudioMuted ? 'muted' : ''}`}
                >
                    {isAudioMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                </button>
                <button
                    onClick={toggleVideo}
                    className={`control-button ${isVideoMuted ? 'muted' : ''}`}
                >
                    {isVideoMuted ? <FaVideoSlash /> : <FaVideo />}
                </button>
                <button onClick={toggleScreenShare} className="control-button">
                    <FaDesktop />
                </button>
                <button onClick={endCall} className="control-button end-call">
                    <FaPhoneSlash />
                </button>
            </div>
        </div>
    );
};

export default React.memo(VideoCall);

// import React, { useEffect, useRef, useState } from 'react';
// import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaPhoneSlash } from 'react-icons/fa';

// const VideoCall = ({ localStream, remoteStream }: { localStream: MediaStream | null, remoteStream: MediaStream | null }) => {
//     const localVideoRef = useRef<HTMLVideoElement>(null);
//     const remoteVideoRef = useRef<HTMLVideoElement>(null);
//     const [isAudioMuted, setIsAudioMuted] = useState(false);
//     const [isVideoMuted, setIsVideoMuted] = useState(false);
//     const [isScreenSharing, setIsScreenSharing] = useState(false);
//     const [viewType, setViewType] = useState('grid'); // "grid" or "popup"

//     useEffect(() => {
//         if (localStream && localVideoRef.current) {
//             localVideoRef.current.srcObject = localStream;
//         }
//     }, [localStream]);

//     useEffect(() => {
//         if (remoteStream && remoteVideoRef.current) {
//             remoteVideoRef.current.srcObject = remoteStream;
//         }
//     }, [remoteStream]);

//     const toggleAudio = () => {
//         setIsAudioMuted(!isAudioMuted);
//         // Implement audio mute/unmute logic here
//     };

//     const toggleVideo = () => {
//         setIsVideoMuted(!isVideoMuted);
//         // Implement video mute/unmute logic here
//     };

//     const toggleScreenShare = () => {
//         setIsScreenSharing(!isScreenSharing);
//         // Implement screen sharing logic here
//     };

//     const endCall = () => {
//         // Implement end call logic here
//     };

//     return (
//         <div className="video-call-container">
//             <div className="view-type-buttons">
//                 <button
//                     onClick={() => setViewType('grid')}
//                     className={`view-type-button ${viewType === 'grid' ? 'active' : ''}`}
//                 >
//                     Grid View
//                 </button>
//                 <button
//                     onClick={() => setViewType('popup')}
//                     className={`view-type-button ${viewType === 'popup' ? 'active' : ''}`}
//                 >
//                     Popup View
//                 </button>
//             </div>

//             {viewType === 'grid' ? (
//                 <div className="video-grid">
//                     <div>
//                         {remoteStream && (
//                             <video ref={remoteVideoRef} autoPlay></video>
//                         )}
//                     </div>
//                     <div>
//                         {localStream && (
//                             <video ref={localVideoRef} autoPlay muted></video>
//                         )}
//                     </div>
//                 </div>
//             ) : (
//                 <div className="video-popup">
//                     <div>
//                         {remoteStream && (
//                             <video ref={remoteVideoRef} autoPlay className="remote"></video>
//                         )}
//                     </div>
//                     <div>
//                         {localStream && (
//                             <video ref={localVideoRef} autoPlay muted className="local"></video>
//                         )}
//                     </div>
//                 </div>
//             )}

//             <div className="controls">
//                 <button
//                     onClick={toggleAudio}
//                     className={`control-button ${isAudioMuted ? 'muted' : ''}`}
//                 >
//                     {isAudioMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
//                 </button>
//                 <button
//                     onClick={toggleVideo}
//                     className={`control-button ${isVideoMuted ? 'muted' : ''}`}
//                 >
//                     {isVideoMuted ? <FaVideoSlash /> : <FaVideo />}
//                 </button>
//                 <button onClick={toggleScreenShare} className="control-button">
//                     <FaDesktop />
//                 </button>
//                 <button onClick={endCall} className="control-button end-call">
//                     <FaPhoneSlash />
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default React.memo(VideoCall);