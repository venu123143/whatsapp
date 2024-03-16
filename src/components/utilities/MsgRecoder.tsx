// import React, { useEffect, useState, useRef } from 'react'
// import { MdDelete, MdSend } from "react-icons/md";
// import { AppDispatch } from '../../Redux/store';
// import { useDispatch } from 'react-redux';
// import { toggleisRecord } from "../../Redux/reducers/utils/Features"
// import { FaRegPauseCircle, FaPlay } from "react-icons/fa";
// import { FaMicrophone, FaPause } from 'react-icons/fa6';
// import WaveSurfer from 'wavesurfer.js'

// const MsgRecoder = () => {
//     const dispatch: AppDispatch = useDispatch()
//     const [isRecording, setisRecording] = useState(false)
//     const [waveForm, setWaveForm] = useState<null | WaveSurfer>(null)
//     const [isPlaying, setisPlaying] = useState(false)
//     const [recordingDuration, setRecordingDuration] = useState(0)
//     const [totalDuration, setTotalDuration] = useState(0)
//     const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0)
//     const [recordedAudio, setRecordedAudio] = useState<any>(null)
//     const [renderedAudio, setRenderedAudio] = useState<null | File>(null)

//     const waveFormRef = useRef(null)
//     const mediaRecorderRef = useRef(null)
//     const audioRef = useRef(null);
//     useEffect(() => {
//         let interval;
//         if (isRecording) {
//             interval = setInterval(() => {
//                 setRecordingDuration((prevDuration) => {
//                     setTotalDuration(prevDuration + 1);
//                     return prevDuration + 1;
//                 })
//             }, 1000)
//         }
//     }, [])
//     const closeRecoder = () => {
//         dispatch(toggleisRecord(false))
//     }
//     const handleRecording = () => {
//         setisRecording(!isRecording)
//     }

//     const formatTime = (time) => {
//         if (isNaN(time)) return "00:00";
//         const minutes = Math.floor(time / 60)
//         const seconds = Math.floor(time % 60)
//         return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
//     }

//     // useEffect(() => {
//     //     const wavesurfer = WaveSurfer.create({
//     //         container: waveFormRef.current,
//     //         waveColor: '#4F4A85',
//     //         progressColor: '#4a9eff',
//     //         cursorColor: '#7ae3c3',
//     //         barWidth: 30,
//     //         // url: '/audio.mp3',
//     //     })
//     //     setWaveForm(wavesurfer)
//     //     wavesurfer.on('finish', () => {
//     //         setisPlaying(false)
//     //     })
//     //     return () => {
//     //         wavesurfer.destroy();
//     //     }
//     // }, [])

//     useEffect(() => {
//         if (waveForm) {
//             handleStartRecording()
//         }
//     }, [waveForm])
//     const handleStopRecording = () => {
//         if (mediaRecorderRef.current && isRecording) {
//             mediaRecorderRef.current.stop();
//             setisRecording(false)
//             waveForm?.stop();
//             const audioChunks = [] as any
//             mediaRecorderRef.current.addEventListner("dataavailable", (event) => {
//                 audioChunks.push(event.data)
//             })
//             mediaRecorderRef.current.addEventListner("stop", () => {
//                 const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
//                 const audioFile = new File([audioBlob], "recording.mp3");
//                 setRenderedAudio(audioFile);

//             })
//         }
//     }
//     const handleStartRecording = () => {
//         setCurrentPlaybackTime(0)
//         setTotalDuration(0)
//         setRecordingDuration(0)
//         setisRecording(true)
//         navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//             const mediaRecorder = new MediaRecorder(stream)
//             mediaRecorderRef.current = mediaRecorder
//             audioRef.current = stream

//             const chunks = [] as any
//             mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
//             mediaRecorder.onstop = () => {
//                 const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
//                 const audioUrl = URL.createObjectURL(blob)

//                 const audio = new Audio(audioUrl)
//                 setRecordedAudio(audio)
//             }
//         }).catch((error) => {

//         })
//     }
//     const handlePlayRecording = () => {
//         if (recordedAudio) {
//             waveForm?.stop();
//             waveForm?.play();

//             recordedAudio.play();
//         }
//         setisPlaying(true)
//     }
//     const handlePauseRecording = () => {
//         waveForm?.stop();
//         recordedAudio.pause();
//         setisPlaying(false)

//     }
//     useEffect(() => {
//         if (recordedAudio) {
//             const updatePlaybackTime = () => {
//                 setCurrentPlaybackTime(recordedAudio.currentTime)
//             }
//             recordedAudio.addEventListner("timeupdate", updatePlaybackTime);
//             return () => {
//                 recordedAudio.removeAddEventListner("timeupdate", updatePlaybackTime)
//             }
//         }
//     }, [recordedAudio])
//     const sendRecording = async () => {

//     }
//     return (
//         <div className='w-full bg-[#202c33] text-2xl ml-auto text-white h-14 px-2 flex items-center justify-end gap-2 sm:gap-6 '>

//             <button onClick={closeRecoder} className='icons group p-3'>
//                 <MdDelete title="delete" size={25} className="group-hover:text-[#e9edef]" />
//             </button>
//             <div className='w-[250px] flex items-center bg-[#111b21] rounded-full p-1 overflow-auto'>
//                 <div className='playOrPause flex justify-center'>
//                     {
//                         !isPlaying ?
//                             <button onClick={handlePlayRecording} className=''>
//                                 <FaPause title="pause Record" />
//                             </button>
//                             :
//                             <button onClick={handlePauseRecording} className=''>
//                                 <FaPlay className="play Audio" />
//                             </button>
//                     }
//                 </div>
//                 <div className='waveform flex justify-center items-center w-full'>
//                     <p>waveform</p>
//                 </div>
//             </div>
//             {
//                 isRecording === true ?
//                     <button onClick={handleRecording} className='icons p-3'>
//                         <FaRegPauseCircle title="pause Record" className="text-red-500" size={25} />
//                     </button> :
//                     <button onClick={handleRecording} className="icons p-3">
//                         <FaMicrophone title="start Record" className="text-red-500" size={25} />
//                     </button>
//             }
//             <button onClick={sendRecording} className="icons  p-3 bg-[#00a884]" type="submit" >
//                 <MdSend title="send" className="" />
//             </button>

//         </div>

//     )
// }

// export default MsgRecoder

// import React, { useEffect, useState, useRef } from 'react';
// import { MdDelete, MdSend } from "react-icons/md";
// import { useDispatch } from 'react-redux';
// import { toggleisRecord } from "../../Redux/reducers/utils/Features";
// import { FaRegPauseCircle, FaPlay, FaMicrophone, FaPause } from "react-icons/fa";
// import WaveSurfer from 'wavesurfer.js';
// import { AppDispatch } from '../../Redux/store';

// const MsgRecoder = () => {
//     const dispatch: AppDispatch = useDispatch();
//     const [isRecording, setIsRecording] = useState(false);
//     const [waveForm, setWaveForm] = useState<WaveSurfer | null>(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [recordingDuration, setRecordingDuration] = useState(0);
//     const [totalDuration, setTotalDuration] = useState(0);
//     const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
//     const [recordedAudio, setRecordedAudio] = useState<HTMLAudioElement | null>(null);
//     const [renderedAudio, setRenderedAudio] = useState<File | null>(null);

//     const waveFormRef = useRef<HTMLDivElement>(null);
//     const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//     const audioRef = useRef<MediaStream | null>(null);

//     useEffect(() => {
//         let interval;
//         if (isRecording) {
//             interval = setInterval(() => {
//                 setRecordingDuration((prevDuration) => {
//                     setTotalDuration(prevDuration + 1);
//                     return prevDuration + 1;
//                 })
//             }, 1000)
//         }
//     }, [])

//     useEffect(() => {
//         if (waveFormRef.current) {
//             const wavesurfer = WaveSurfer.create({
//                 container: waveFormRef.current,
//                 waveColor: '#4F4A85',
//                 progressColor: '#4a9eff',
//                 cursorColor: '#7ae3c3',
//                 barWidth: 2,
//             });
//             setWaveForm(wavesurfer);
//             return () => wavesurfer.destroy();
//         }
//     }, []);

//     const closeRecorder = () => {
//         dispatch(toggleisRecord(false));
//     };

//     const handleRecording = () => {
//         setIsRecording(!isRecording);
//     };

//     const formatTime = (time: number) => {
//         const minutes = Math.floor(time / 60);
//         const seconds = Math.floor(time % 60);
//         return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//     };

//     const handleStopRecording = () => {
//         if (mediaRecorderRef.current && isRecording) {
//             mediaRecorderRef.current.stop();
//             setIsRecording(false);
//             waveForm?.stop();
//         }
//     };

//     const handleStartRecording = () => {
//         setCurrentPlaybackTime(0);
//         setTotalDuration(0);
//         setRecordingDuration(0);
//         setIsRecording(true);

//         navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
//             const mediaRecorder = new MediaRecorder(stream);
//             mediaRecorderRef.current = mediaRecorder;
//             audioRef.current = stream;

//             const chunks: BlobPart[] = [];
//             mediaRecorder.ondataavailable = e => chunks.push(e.data);
//             mediaRecorder.onstop = () => {
//                 const blob = new Blob(chunks, { type: "audio/webm" });
//                 const audioUrl = URL.createObjectURL(blob);
//                 const audio = new Audio(audioUrl);
//                 setRecordedAudio(audio);
//             };
//             mediaRecorder.start();
//         }).catch(error => {
//             console.error("Error while recording audio: ", error);
//         });
//     };

//     const handlePlayRecording = () => {
//         if (recordedAudio) {
//             waveForm?.stop();
//             waveForm?.play();
//             recordedAudio.play();
//             setIsPlaying(true);
//         }
//     };

//     const handlePauseRecording = () => {
//         waveForm?.stop();
//         recordedAudio?.pause();
//         setIsPlaying(false);
//     };

//     useEffect(() => {
//         if (recordedAudio) {
//             const updatePlaybackTime = () => setCurrentPlaybackTime(recordedAudio.currentTime);
//             recordedAudio.addEventListener("timeupdate", updatePlaybackTime);
//             return () => recordedAudio.removeEventListener("timeupdate", updatePlaybackTime);
//         }
//     }, [recordedAudio]);

//     const sendRecording = async () => {
//         // Implement your logic for sending the recording
//     };

//     return (
//         <div className='w-full bg-[#202c33] text-2xl ml-auto text-white h-14 px-2 flex items-center justify-end gap-2 sm:gap-6 '>
//             <button onClick={closeRecorder} className='icons group p-3'>
//                 <MdDelete title="delete" size={25} className="group-hover:text-[#e9edef]" />
//             </button>
//             <div className='w-[250px] flex items-center bg-[#111b21] rounded-full  overflow-auto'>
//                 <div className='playOrPause flex justify-center'>
//                     {isPlaying ? (
//                         <button onClick={handlePauseRecording}>
//                             <FaPause title="pause Record" />
//                         </button>
//                     ) : (
//                         <button onClick={handlePlayRecording}>
//                             <FaPlay title="play Record" />
//                         </button>
//                     )}
//                     {
//                         recordedAudio && !isPlaying && (
//                             <span>{formatTime(currentPlaybackTime)}</span>
//                         )
//                     }
//                     {
//                         recordedAudio && isPlaying && (
//                             <span>{formatTime(totalDuration)}</span>
//                         )
//                     }
//                     <audio ref={audioRef} />
//                 </div>
//                 <div ref={waveFormRef} className='waveform flex justify-center items-center w-full'>
//                     <p>Waveform</p>
//                 </div>
//             </div>

//             {isRecording ? (
//                 <button onClick={handleStopRecording} className='icons p-3'>
//                     <FaRegPauseCircle title="stop Record" className="text-red-500" size={25} />
//                 </button>
//             ) : (
//                 <button onClick={handleStartRecording} className="icons p-3">
//                     <FaMicrophone title="start Record" className="text-red-500" size={25} />
//                 </button>
//             )}
//             <button onClick={sendRecording} className="icons  p-3 bg-[#00a884]" type="submit" >
//                 <MdSend title="send" />
//             </button>
//         </div>
//     );
// };

// export default MsgRecoder;

import React, { useEffect, useState, useRef } from 'react';
import { MdDelete, MdSend } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { toggleisRecord } from "../../Redux/reducers/utils/Features";
import { FaRegPauseCircle, FaPlay, FaMicrophone, FaPause } from "react-icons/fa";
import WaveSurfer from 'wavesurfer.js';
import { AppDispatch } from '../../Redux/store';
import audioFile from "../../static/Rss Prathana - 8096339900.mp3"
import ammayeSannaga from "../../static/Ammaye sannaga.ogg"
const MsgRecoder = () => {
    const dispatch: AppDispatch = useDispatch();
    const [waveForm, setWaveForm] = useState<WaveSurfer | null>(null);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
    const [recordedAudio, setRecordedAudio] = useState<HTMLAudioElement | null>(null);
    const [renderedAudio, setRenderedAudio] = useState<File | null>(null);

    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const waveFormRef = useRef<HTMLDivElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioRef = useRef<MediaStream | null>(null);
    const [recordedWave, setRecordedWave] = useState();

    const recordedAudioRef = useRef<HTMLDivElement | null>(null);
    const [fileURL, setFileUrl] = useState(ammayeSannaga);
    const [wavesurferObj, setWavesurferObj] = useState<WaveSurfer | null>(null);

    useEffect(() => {
        if (recordedAudioRef.current && !wavesurferObj) {
            const wavesurfer = WaveSurfer.create({
                container: '#waveform',
                waveColor: "#848488",
                progressColor: "red",
                barWidth: 2,
                audioRate: 1,
                fillParent: true,
                barGap: 2,
                autoCenter: true,
                height: 40,
                cursorWidth: 2,
            });
            setWavesurferObj(wavesurfer);
            // return () => wavesurfer.destroy()
        }
    }, [recordedAudioRef, wavesurferObj]);

    // Load audio file when fileURL or wavesurferObj changes
    useEffect(() => {
        if (fileURL && wavesurferObj) {
            wavesurferObj.load(fileURL);
        }
        wavesurferObj?.on('finish', () => {
            setIsPlaying(false);
        });
    }, [fileURL, wavesurferObj]);

    // Play recording
    const handlePlayRecording = () => {
        wavesurferObj?.play();
        setIsPlaying(true);
    };

    // Pause recording
    const handlePauseRecording = () => {
        wavesurferObj?.pause();
        setIsPlaying(false);
    };

    const closeRecorder = () => {
        dispatch(toggleisRecord(false));
    };
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        let timerInterval: any;
        if (isPlaying && wavesurferObj) {
            timerInterval = setInterval(() => {
                setCurrentPlaybackTime(wavesurferObj.getCurrentTime());
            }, 1000);
        }
        return () => {
            clearInterval(timerInterval);
        };
    }, [isPlaying, wavesurferObj]);
    const handleStopRecording = () => {
        // if (mediaRecorderRef.current && isRecording) {
        //     mediaRecorderRef.current.stop();
        //     waveForm?.stop();
        // }

        setIsRecording(false);
    };

    const handleStartRecording = () => {
        setIsRecording(true);
    };


    const sendRecording = async () => {
        // Implement your logic for sending the recording
    };

    return (
        <div className='w-full bg-[#202c33] text-2xl ml-auto text-white  h-14 flex items-center justify-end gap-2 sm:gap-6 '>
            <button onClick={closeRecorder} className='icons group p-3'>
                <MdDelete title="delete" size={25} className="group-hover:text-[#e9edef]" />
            </button>
            <div className='w-[250px] bg-[#111b21] rounded-full px-2 '>
                <div className='w-full'>
                    {
                        isRecording ? (
                            <div ref={waveFormRef} id='waveformdd' className='h-10' />
                        ) : (
                            <div className=' flex justify-center gap-3 items-center  '>
                                {isPlaying ? (
                                    <button onClick={handlePauseRecording}>
                                        <FaPause title="pause Record" />
                                    </button>
                                ) : (
                                    <button onClick={handlePlayRecording}>
                                        <FaPlay title="play Record" />
                                    </button>
                                )}
                                <div ref={recordedAudioRef} id='waveform' className='w-full' />
                                <div className='font-Rubik text-sm'>
                                    {formatTime(currentPlaybackTime)}
                                </div>
                            </div>

                        )
                    }
                    {/* {
                        recordedAudio && !isPlaying && (
                            <span>{formatTime(currentPlaybackTime)}</span>
                        )
                    }
                    {
                        recordedAudio && isPlaying && (
                            <span>{formatTime(recordingDuration)}</span>
                        )
                    } */}
                </div>
            </div>

            {/* <div ref={recordedAudioRef} id='waveform' className='w-full' /> */}

            {isRecording ? (
                <button onClick={handleStopRecording} className='icons p-3'>
                    <FaRegPauseCircle title="stop Record" className="text-red-500" size={25} />
                </button>
            ) : (
                <button onClick={handleStartRecording} className="icons p-3">
                    <FaMicrophone title="start Record" className="text-red-500" size={25} />
                </button>
            )}
            <button onClick={sendRecording} className="icons  p-3 bg-[#00a884]" type="submit" >
                <MdSend title="send" />
            </button>
        </div>
    );
};

export default MsgRecoder;

