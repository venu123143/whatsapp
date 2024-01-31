
import { useSelector, useDispatch } from "react-redux";
import Message from "../cards/Message";
import { RootState } from "../../Redux/store";
import { FcContacts } from "react-icons/fc";
import { IoMdPhotos } from "react-icons/io";
import { AiOutlineCamera } from "react-icons/ai";
import { MdPoll } from "react-icons/md";
import { PiStickerDuotone } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  handleFileChange,
  handleToggleImagesAndMessage,
} from "../../Redux/reducers/utils/utilReducer";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { showAttachFiles, toggleImagesAndMessage, } = useSelector((state: RootState) => state.utils);
  const { currentUserIndex, friends } = useSelector((state: RootState) => state.msg)

  const chats = friends[currentUserIndex]?.chat

  //   const setRef = useCallback((node) => {
  //     if (node) {
  //       node.scrollIntoView({ smooth: true });
  //     }
  //   }, []);
  // 01-Jan-2024 - format

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

  return (
    <div className="relative h-full ">
      <div className=" px-16 py-5 ">

        {chats && chats.map((message: any, index: number) =>
          typeof message.message === "string" ? (
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
                : null
              }
            </div>
          ) : (
            message.map((image: any, imageIndex: number) => (
              <div className="flex flex-col items-end" key={imageIndex}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="h-[150px] w-[150px] mb-4 border-4  border-green-700"
                />
              </div>
            ))
          )
        )}

        {/* files  */}
        <div aria-orientation="vertical" aria-labelledby="menu-button"
          className={`fixed transition-all ease-in-out duration-200 delay-100 ${showAttachFiles === true ? "scale-x-100" : "scale-x-0"
            } z-10 bottom-16  mt-2 origin-bottom-left rounded-lg bg-[#233138] text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
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
              <input
                type="file"
                id="photos&videos"
                className="hidden"
                multiple
                onChange={(e: any) => {
                  dispatch(
                    handleToggleImagesAndMessage(!toggleImagesAndMessage)
                  );
                  dispatch(handleFileChange(e.target.files));
                }}
              />
              <label
                htmlFor="photos&videos"
                className=" text-md text-white cursor-pointer"
                role="menuitem">
                {" "}
                photos & videos
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
    </div>
  );
};

export default ChatPage;
