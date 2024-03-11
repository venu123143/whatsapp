import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../cards/Message";
import { AppDispatch, RootState } from "../../Redux/store";
import { FcContacts } from "react-icons/fc";
import { IoMdPhotos } from "react-icons/io";
import { AiOutlineCamera } from "react-icons/ai";
import { MdPoll } from "react-icons/md";
import { PiStickerDuotone } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  setShowAttachFiles,
} from "../../Redux/reducers/utils/utilReducer";
import ImageComp from "./ImageComp";
import { ChatMessage, handleSendMessage } from "../../Redux/reducers/msg/MsgReducer";
import { openfullScreen } from "../../Redux/reducers/utils/Features";
import ShowFullImg from "./ShowFullImg";
import { formatDate } from "../cards/ReUseFunc"
import { SocketContext } from "../../pages/Home"
import { recieveColors, ReceiveColors } from "../../static/Static";

const ChatPage = ({ scrollToMessage }: { scrollToMessage: (messageId: string) => void }) => {
  const dispatch: AppDispatch = useDispatch()
  const socket = useContext(SocketContext);
  const { showAttachFiles, } = useSelector((state: RootState) => state.utils);
  const { currentUserIndex, friends } = useSelector((state: RootState) => state.msg)
  const { user } = useSelector((state: RootState) => state.auth)
  const currChatImages = friends[currentUserIndex].chat.filter((msg: any) => msg?.msgType === "image")
  const chats = friends[currentUserIndex]?.chat


  const getRandomColor = () => {
    const colors = Object.keys(recieveColors);
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    return recieveColors[colors[randomColorIndex]] as keyof ReceiveColors
  };
  const isFirstMessageOfDay = (currentMessage: any, previousMessage: any) => {
    if (!previousMessage) {
      return true;
    }
    const currentDate = new Date(currentMessage.date);
    const previousDate = new Date(previousMessage.date);
    return currentDate.toDateString() !== previousDate.toDateString();
  };

  useEffect(() => {
    if (socket.connected && currentUserIndex !== null) {
      const unread = friends[currentUserIndex].chat.filter((msg: any) => msg.seen === false && msg.right === false)
      if (unread.length > 0 && friends[currentUserIndex].socket_id === unread[0].senderId) {
        socket.emit("update_seen", unread)
      }
    }
  }, [currentUserIndex])

  const handleUploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    dispatch(setShowAttachFiles(false));

    const imagesArray = Array.from(e.target.files);
    const handleImageUpload = (image: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onloadend = () => {
        const base64data = reader.result?.toString();
        console.log("base64data");
        
        const serializedValues: ChatMessage = {
          message: 'image',
          date: new Date().toISOString(),
          right: true,
          msgType: 'image',
          senderId: user?.socket_id as string,
          conn_type: "onetoone",
          recieverId: friends[currentUserIndex].socket_id,
          image: base64data,
          seen: false
        };

        dispatch(handleSendMessage(serializedValues));
        socket.emit("send_message", serializedValues);

      };
    };

    imagesArray.forEach((image,index) => {
      console.log(index, "foreach");
      
      handleImageUpload(image);
    });

  }


  const handleShowBigImg = (message: any) => {
    const clickedImageIndex = currChatImages.findIndex((img: any) => img.date === message.date);
    dispatch(openfullScreen({ currentImage: message.image, isFullscreen: true, zoomLevel: 1, currentIndex: clickedImageIndex }))
  }
  // src={URL.createObjectURL(image)}
  return (
    <div className=" h-full ">
      <div className=" sm:px-16 sm:py-5 px-5 py-5">
        {chats && chats.map((message: any, index: number) =>
          <div key={index}>
            {isFirstMessageOfDay(message, index > 0 ? chats[index - 1] : null) ? (
              <div className="flex justify-center items-center">
                <div className="text-center text-[.81rem] mb-3 bg-[#111b21] py-2 px-2 text-[#8696a0] rounded-lg uppercase">
                  {formatDate(message.date)}
                </div>
              </div>
            ) : null}
            {message.msgType === "notification" ? <p className="notification mb-5">{message.message}</p> : null}
            {message.msgType === "text" ?
              <Message
                key={index}
                message={message}
                color={getRandomColor() as string}
                scrollToMessage={scrollToMessage}
                index={index}
              />
              : null}
            {message.msgType === "image" ? <ImageComp key={index} onClick={() => handleShowBigImg(message)}
              date={message.date} right={message.right} image={message.image} seen={message.seen} />
              : null}
          </div>
        )}
        {/* files  */}
        <div aria-orientation="vertical" aria-labelledby="menu-button"
          className={`attachedFiles ${showAttachFiles === true ? "scale-x-100" : "scale-x-0"} `}
          role="menu" >
          <div className="py-1 px-3 cursor-pointer" role="none">
            <div className="hover:bg-[#111b21] rounded-md text-white flex gap-3  items-center py-1.5 px-2">
              <IoDocumentTextOutline
                size={20}
                className="inline text-[#9185ce]"
              />
              <input type="file" id="document" className="hidden" multiple />
              <label
                htmlFor="document"
                className=" text-md text-white cursor-pointer"
                role="menuitem"
              >
                {" "}
                document
              </label>
            </div>
            <div className="hover:bg-[#111b21] rounded-md text-white flex gap-3  items-center py-1.5 px-2">
              <IoMdPhotos size={20} className="inline text-[#007bfc]" />
              <input id="photosvideos" multiple={true} type="file" accept=".jpg, .jpeg, .png" className="hidden"
                onChange={handleUploadImages} />
              <label htmlFor="photosvideos" className=" text-md text-white cursor-pointer" role="menuitem">
                {" "} photos & videos
              </label>
            </div>
            <div className="hover:bg-[#111b21] rounded-md text-white flex gap-3  items-center py-1.5 px-2">
              <AiOutlineCamera size={20} className="inline text-[#c78399]" />
              <p
                className=" block  text-md  text-white cursor-pointer"
                role="menuitem"
              >
                camera
              </p>
            </div>
            <div className="hover:bg-[#111b21] rounded-md text-white flex gap-3  items-center py-1.5 px-2">
              <FcContacts size={20} className="inline text-[#007bfc]" />
              <p
                className=" block  text-md  text-white cursor-pointer"
                role="menuitem"
              >
                contact
              </p>
            </div>
            <div className="hover:bg-[#111b21] rounded-md text-white flex gap-3  items-center py-1.5 px-2">
              <MdPoll size={20} className="inline text-[#ffbc38]" />
              <p
                className="block  text-md  text-white cursor-pointer"
                role="menuitem"
              >
                poll
              </p>
            </div>
            <div className="hover:bg-[#111b21] rounded-md text-white flex gap-3  items-center py-1.5 px-2">
              <PiStickerDuotone size={20} className="inline text-[#02a698]" />
              <input type="file" id="sticker" className="hidden" />
              <label
                htmlFor="sticker"
                className=" text-md text-white cursor-pointer"
                role="menuitem" >
                {" "}
                sticker
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ShowFullImg images={currChatImages} />
      </div>
    </div>
  );
};

export default ChatPage;
