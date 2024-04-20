import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { BiCheck, BiCheckDouble } from 'react-icons/bi';
import { IoMdMic } from "react-icons/io";
import useCloseDropDown from '../reuse/CloseDropDown';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { FaRegUserCircle } from 'react-icons/fa';
import { formatTime } from '../../static/Static';
import useWaveSurfer from '../reuse/WaveSurfer';
import { FaPause, FaPlay } from 'react-icons/fa6';

interface AudioProps {
  onClick: () => void;
  message: any;
  color: string
}

const Audio: React.FC<AudioProps> = ({ onClick, message, color }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);

  const waveRef = useRef<HTMLDivElement | null>(null);
  const wavesurferObj = useWaveSurfer(waveRef);
  useEffect(() => {
    if (message.file && wavesurferObj) {
      wavesurferObj.load(message.file);
    }
    wavesurferObj?.on('finish', () => {
      setIsPlaying(false);
    });
    wavesurferObj?.on('audioprocess', () => {
      setCurrentPlaybackTime(wavesurferObj.getCurrentTime());
    });

  }, [message.file, wavesurferObj]);

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


  const [options, setOptions] = useCloseDropDown(false, '.dropdown');
  const { currentUserIndex, friends } = useSelector((state: RootState) => state.msg);
  let user: any;
  const handleToggleOptions = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setOptions(!options)
  }
  return (
    <div id={`message-${message.date}`} className={`flex ${message.right === true ? null : "flex-row-reverse"} `}>
      <div className={`${message.right === true
        ? "ml-auto bg-[#008069] rounded-tl-md rounded-bl-md rounded-br-md"
        : "bg-[#233138] rounded-tr-md rounded-br-md rounded-bl-md  mr-auto"
        } group relative text-[.91rem] w-fit max-w-sm  text-[#ededef]  mb-[10px]  px-1 py-1 `} >
        <h3 className={`${message.right === true ? "hidden" : message.conn_type === 'group' ? `block ${color} ` : "hidden"} font-Rubik tracking-wide font-[500] text-[.91rem]`}>~ {message?.senderName}</h3>
        <div className={`flex  justify-center items-center space-x-2  ${message.right === true ? "flex-row-reverse" : "flex-row"}`}>
          <div id='waveform' ref={waveRef} className='w-[140px]' />
          <div className='font-Rubik text-sm'>
            {formatTime(currentPlaybackTime)}
          </div>
          {isPlaying ? (
            <button onClick={handlePauseRecording}>
              <FaPause title="pause Record" />
            </button>
          ) : (
            <button onClick={handlePlayRecording}>
              <FaPlay title="play Record" />
            </button>
          )}
          <div className="cursor-pointer">
            {
              user?.profile === "" || !user?.profile ? (
                <div className="">
                  <FaRegUserCircle size={40} className="text-black bg-white hover:bg-opacity-80 rounded-full sm:cursor-pointer " />
                </div>
              ) :
                <img src={user?.profile} className="object-cover sm:cursor-pointer hover:bg-black rounded-full w-[40px] h-[40px]" alt="Profile" />
            }
          </div>

        </div>


        <span className=" flex h-fit w-fit ml-auto items-end justify-end">
          <span className="text-[10px] text-[#ffffff99]">
            {new Date(message.date).toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
              minute: "numeric",
            })}
            {message.seen === true ?
              <BiCheckDouble
                className={`${message.right === true ? "inline text-[#4FB6EC]" : "hidden"
                  }`}
                size={20}
              /> :
              friends[currentUserIndex]?.online_status === "true" ?
                <BiCheckDouble
                  className={`${message.right === true ? "inline text-[#ffffff99]" : "hidden"
                    }`}
                  size={20}
                /> :
                <BiCheck
                  className={`${message.right === true ? "inline text-[#f0f2f5]" : "hidden"
                    }`}
                  size={20}
                />

            }
          </span>
          <span className={`${message.right === true ? "bg-[#008069] " : "bg-[#233138] "} 
                    absolute top-0 right-2 group-hover:translate-y-0 translate-y-5 group-hover:visible invisible transition-all shadow-sm
                     shadow-black  p-1 rounded-b-full sm:cursor-pointer`}
            onClick={handleToggleOptions}>
            <AiOutlineDown size={15} />
          </span>
        </span>
      </div>
      {message.right === true ? (
        <span>
          <svg
            className={`ml-auto text-[#008069]  block align-middle`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8 13"
            width="8"
            height="13"
          >
            <path
              opacity=".13"
              d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
            ></path>
            <path
              fill="currentColor"
              d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
            ></path>
          </svg>
        </span>
      ) : (
        <span>
          <svg
            className="mr-auto -scale-x-100 text-[#233138]  block align-middle"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8 13"
            width="8"
            height="13"
          >
            <path
              opacity=".13"
              d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
            ></path>
            <path
              fill="currentColor"
              d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
            ></path>
          </svg>
        </span>
      )}
    </div>

  );
};

export default Audio;
