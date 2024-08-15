
import React, { useState, useEffect, useRef, useContext } from 'react';
import { MdDelete, MdSend } from "react-icons/md";
import { FaRegPauseCircle, FaPlay, FaMicrophone, FaPause } from "react-icons/fa";
import useWaveSurfer from "../reuse/WaveSurfer";
import { formatTime, convertBlobToBase64 } from '../../static/Static';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { toggleisRecord } from '../../Redux/reducers/utils/Features';
// import ammayeSannaga from "../../static/Ammaye sannaga.ogg"
import { toast } from 'react-toastify';
import { ChatMessage, handleSendMessage } from '../../Redux/reducers/msg/MsgReducer';
import { SocketContext } from "../../App";

const MsgRecoder = () => {

    const { friends, currentUserIndex } = useSelector((state: RootState) => state.msg);
    const { user } = useSelector((state: RootState) => state.auth)
    const socket = useContext(SocketContext);

    const dispatch: AppDispatch = useDispatch();
    const [fileUrl, setFileUrl] = useState<null | string>(null)
    const [blobData, setBlobData] = useState<null | Blob>(null)
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const waveRef = useRef<HTMLDivElement | null>(null);
    const recordingRef = useRef<HTMLDivElement | null>(null);

    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);

    const wavesurferObj = useWaveSurfer(waveRef);
    // const recordingWave = useWaveSurfer(recordingRef, true);
    // const getDuration = wavesurferObj?.getDuration().toPrecision()
    // const roundedDuration = Math.floor(parseFloat(wavesurferObj?.getDuration().toString() as string)); 
    // console.log(roundedDuration);

    useEffect(() => {
        if (fileUrl && wavesurferObj) {
            wavesurferObj.load(fileUrl);
        }
        wavesurferObj?.on('finish', () => {
            setIsPlaying(false);
        });
        wavesurferObj?.on('audioprocess', () => {
            setCurrentPlaybackTime(wavesurferObj.getCurrentTime());
        });

    }, [fileUrl, wavesurferObj]);

    useEffect(() => {
        handleStartRecording()
    }, [])
    const handleStartRecording = async () => {
        try {
            setIsRecording(true);
            setRecordingTime(0);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks: BlobPart[] = [];
            recorder.ondataavailable = (event) => {
                chunks.push(event.data);
            };
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
                setBlobData(blob)
                const audioUrl = URL.createObjectURL(blob);
                setFileUrl(audioUrl);
            };
            recorder.start();
            setMediaRecorder(recorder);
        } catch (error: any) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            setTimeout(() => {
                setRecordingTime(recordingTime + 1)
            }, 1000)
        }
    }, [recordingTime, mediaRecorder])

    // Function to stop recording
    const handleStopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            setIsRecording(false)
            wavesurferObj?.stop()
            mediaRecorder.stop();
        }
        // Your logic to stop recording
    };

    // Function to play recording
    const handlePlayRecording = () => {
        setIsPlaying(true)
        wavesurferObj?.play()
        // Your logic to play recording
    };

    // Function to pause recording
    const handlePauseRecording = () => {
        setIsPlaying(false)
        wavesurferObj?.pause()
        // Your logic to pause recording
    };

    // Function to send recording
    const sendRecording = async () => {
        dispatch(toggleisRecord(false));
        setIsRecording(false)
        wavesurferObj?.stop();
        mediaRecorder?.stop();
        const base64 = await convertBlobToBase64(blobData as Blob)
        const audio = { profile: user?.profile, audio: base64 }
        const serializedValues: ChatMessage = {
            message: 'audio',
            date: new Date().toISOString(),
            right: true,
            msgType: 'audio',
            senderId: user?.socket_id as string,
            conn_type: "onetoone",
            recieverId: friends[currentUserIndex].socket_id,
            file: audio,
            seen: false
        };
        dispatch(handleSendMessage(serializedValues));
        socket.emit("send_message", serializedValues)
    };

    // Function to close the recorder
    const closeRecorder = () => {
        // Your logic to close the recorder
        dispatch(toggleisRecord(false));
        wavesurferObj?.stop();
        mediaRecorder?.stop();
    };

    return (
        <div className='w-full bg-[#202c33] text-2xl ml-auto text-white h-14 flex items-center justify-end gap-2 sm:gap-6'>
            <button onClick={closeRecorder} className='icons group p-3'>
                <MdDelete title="delete" size={25} className="group-hover:text-[#e9edef]" />
            </button>

            <div className='w-[250px] bg-[#111b21] rounded-full px-2 '>
                <div className='w-full'>
                    {
                        isRecording ? (
                            <div className='flex justify-center gap-3 items-center '>
                                <div className='font-Rubik text-sm'>
                                    {formatTime(recordingTime)}
                                </div>
                                {/* <h1 className='font-[450] text-[1rem]'>recording...</h1> */}
                                <div id='recording' ref={recordingRef} className='w-full' />
                            </div>
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
                                <div id='waveform' ref={waveRef} className='w-full' />
                                <div className='font-Rubik text-sm'>
                                    {formatTime(currentPlaybackTime)}
                                </div>
                            </div>

                        )
                    }
                </div>
            </div>
            {
                isRecording ? (
                    <button onClick={handleStopRecording} className='icons p-3'>
                        <FaRegPauseCircle title="stop Record" className="text-red-500" size={25} />
                    </button>
                ) : (
                    <button onClick={handleStartRecording} className="icons p-3">
                        <FaMicrophone title="start Record" className="text-red-500" size={25} />
                    </button>
                )
            }
            <button onClick={sendRecording} className="icons  p-3 bg-[#00a884]" type="submit" >
                <MdSend title="send" />
            </button>

        </div>
    );
};

export default React.memo(MsgRecoder);
