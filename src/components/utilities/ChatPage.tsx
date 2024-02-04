import React from "react";
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

const ChatPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const { showAttachFiles, } = useSelector((state: RootState) => state.utils);
  const { currentUserIndex, friends } = useSelector((state: RootState) => state.msg)
  const { user } = useSelector((state: RootState) => state.auth)
  const currChatImages = friends[currentUserIndex].chat.filter((msg: any) => msg?.msgType === "image")

  const chats = friends[currentUserIndex]?.chat

  const formatDate = (inputDate: string) => {
    const today = new Date();
    const messageDate = new Date(inputDate);

    // Check if the date is today
    if (
      today.getFullYear() === messageDate.getFullYear() &&
      today.getMonth() === messageDate.getMonth() &&
      today.getDate() === messageDate.getDate()
    ) {
      return 'Today';
    }

    // Check if the date is this week
    const daysSinceMessage = Math.floor(
      (today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceMessage < 7) {
      return messageDate.toLocaleDateString('en-US', { weekday: 'long' });
    }
    return messageDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isFirstMessageOfDay = (currentMessage: any, previousMessage: any) => {
    if (!previousMessage) {
      return true;
    }
    const currentDate = new Date(currentMessage.date);
    const previousDate = new Date(previousMessage.date);
    return currentDate.toDateString() !== previousDate.toDateString();
  };
  const handleUploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    dispatch(setShowAttachFiles(false))
    const imagesArray = Array.from(files);
    imagesArray.forEach((image: any) => {
      const serializedValues: ChatMessage = {
        message: 'this is image message',
        date: new Date().toISOString(),
        right: true,
        msgType: 'image',
        senderId: user?.socket_id as string,
        conn_type: "onetoone",
        recieverId: friends[currentUserIndex].socket_id,
        image: image
      };
      dispatch(handleSendMessage(serializedValues));
    });
  }
  const handleShowBigImg = (message: any) => {
    const clickedImageIndex = currChatImages.findIndex((img: any) => img.date === message.date);
    dispatch(openfullScreen({ currentImage: message.image, isFullscreen: true, zoomLevel: 1, currentIndex: clickedImageIndex }))

  }
  // src={URL.createObjectURL(image)}
  return (
    <div className="relative h-full ">
      <div className=" px-16 py-5 ">
        {chats && chats.map((message: any, index: number) =>
          <div key={index}>
            {isFirstMessageOfDay(message, index > 0 ? chats[index - 1] : null) ? (
              <div className="flex justify-center items-center">
                <div className="text-center text-[.81rem] mb-3 bg-[#111b21] py-2 px-2 text-[#8696a0] rounded-lg uppercase">
                  {formatDate(message.date)}
                </div>
              </div>
            ) : null}
            {message.msgType === "notification" ? <p className="notification">{message.message}</p> : null}
            {message.msgType === "text" ?
              <Message
                key={index}
                message={message.message}
                date={message.date}
                right={message.right}
              />
              : <ImageComp key={index} onClick={() => handleShowBigImg(message)} date={message.date} right={message.right} image={message.image} />
            }
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
