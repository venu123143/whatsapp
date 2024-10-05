
import React, { useState, useEffect, useRef, useContext } from 'react';
import { MdDelete, MdSend } from "react-icons/md";
import { FaRegPauseCircle, FaPlay, FaMicrophone, FaPause } from "react-icons/fa";
import useWaveSurfer from "../reuse/WaveSurfer";
import { formatTime, convertBlobToBase64 } from '../../static/Static';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { toggleisRecord } from '../../Redux/reducers/utils/Features';
import { toast } from 'react-toastify';
import { ChatMessage, handleSendMessage, IMessage } from '../../Redux/reducers/msg/MsgReducer';
import { SocketContext } from "../../App";
import WaveformVisualizer from './WaveForm';

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
    const [showWaveform, setShowWaveform] = useState(false);

    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

    const wavesurferObj = useWaveSurfer(waveRef);

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
    }, [fileUrl, isRecording, wavesurferObj]);

    useEffect(() => {
        handleStartRecording()
    }, [])

    const handleStartRecording = async () => {
        try {
            setIsRecording(true);
            setRecordingTime(0);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setAudioStream(stream);
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
                stream.getTracks().forEach(track => track.stop());
                setAudioStream(null);
            };
            recorder.start();
            setMediaRecorder(recorder);
        } catch (error: any) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        let timer: any
        if (isRecording) {
            timer = setInterval(() => {
                setRecordingTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRecording]);

    const handleStopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            setIsRecording(false);
            wavesurferObj?.stop();
            mediaRecorder.stop();
            setShowWaveform(true); // Show waveform when recording stops
        }
    };

    const handlePlayRecording = () => {
        setIsPlaying(true);
        wavesurferObj?.play();
    };

    const handlePauseRecording = () => {
        setIsPlaying(false);
        wavesurferObj?.pause();
    };

    const sendRecording = async () => {
        if (isRecording) {
            await handleStopRecording();
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (!blobData) {
            toast.error("No recording to send");
            return;
        }

        dispatch(toggleisRecord(false));
        const base64 = await convertBlobToBase64(blobData) as string;
        const serializedValues: IMessage = {
            message: 'audio',
            conn_type: friends[currentUserIndex].conn_type as "group" | "onetoone",
            date: new Date().toISOString(),
            isMyMsg: true,
            msgType: 'audio',
            room_id: friends[currentUserIndex].room_id,
            file: base64,
            seen: false,
            send: false,
            replyFor: null,
            sender: {
                id: user?._id as any,
                mobile: user?.mobile as any,
                name: user?.name
            }
        };
        dispatch(handleSendMessage(serializedValues));
        socket.emit("send_message", serializedValues, (ack: any) => {
            dispatch(handleSendMessage(ack));
        });
        // Reset state after sending
        setFileUrl(null);
        setBlobData(null);
        setRecordingTime(0);
        setCurrentPlaybackTime(0);
    };

    const closeRecorder = () => {
        dispatch(toggleisRecord(false));
        handleStopRecording();
        setFileUrl(null);
        setBlobData(null);
        setRecordingTime(0);
        setCurrentPlaybackTime(0);
    };

    return (
        <div className='w-full bg-[#202c33] text-2xl ml-auto text-white h-14 flex items-center justify-end gap-2 sm:gap-6'>
            <button onClick={closeRecorder} className='icons group p-3'>
                <MdDelete title="delete" size={25} className="group-hover:text-[#e9edef]" />
            </button>

            <div className=''>
                <div className={`${showWaveform ? "flex" : "block"}  w-[300px] bg-[#111b21] gap-2 rounded-full px-4 `}>
                    {
                        isRecording ? (
                            <div id="recording" className='flex justify-center gap-3 items-center'>
                                <div className='font-Rubik text-sm'>
                                    {formatTime(recordingTime)}
                                </div>
                                <WaveformVisualizer isRecording={isRecording} stream={audioStream} />
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
                                <div className='font-Rubik text-sm'>
                                    {formatTime(currentPlaybackTime)}
                                </div>
                            </div>
                        )

                    }
                    <div id='waveform' ref={waveRef} className={`w-full ${showWaveform ? 'block' : 'hidden'}`} />
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
            <button onClick={sendRecording} className="icons p-3 bg-[#00a884]" type="submit" >
                <MdSend title="send" />
            </button>
        </div>
    );
};

export default React.memo(MsgRecoder);