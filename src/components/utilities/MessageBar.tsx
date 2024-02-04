

import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store"
import { setShowAttachFiles } from "../../Redux/reducers/utils/utilReducer"
// import { FaMicrophone } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useFormik } from "formik";
import { FaMicrophone } from "react-icons/fa6";
import { handleSendMessage, ChatMessage, handleRecieveMessage } from "../../Redux/reducers/msg/MsgReducer";
import { SocketContext } from "../../pages/Home"
const MessageBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { showAttachFiles } = useSelector((store: RootState) => store.utils);
  const { user } = useSelector((store: RootState) => store.auth);
  const { currentUserIndex, friends } = useSelector((state: RootState) => state.msg);
  const socket = useContext(SocketContext);
  const [tagReply, setTagReply] = useState<boolean>(false);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const handleEmojiPicker = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setShowEmoji(!showEmoji)
  }
  const handleAddEmoji = (emoji: EmojiClickData) => {
    formik.values.message = formik.values.message + emoji.emoji
  }
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { resetForm }) => {
      let conn_type;
      if (friends[currentUserIndex] && friends[currentUserIndex].users) {
        conn_type = "group"
      } else {
        conn_type = "onetoone"
      }
      if (values.message !== '' && currentUserIndex !== null && friends[currentUserIndex]) {
        const serializedValues: ChatMessage = {
          message: values.message,
          date: new Date().toISOString(),
          right: true,
          msgType: 'text',
          senderId: user?.socket_id as string,
          conn_type: conn_type,
          recieverId: friends[currentUserIndex].socket_id,
        };

        // Emit "send_message" event when the form is submitted
        socket.emit("send_message", serializedValues);

        dispatch(handleSendMessage(serializedValues));
        resetForm();
      }
    }
  })

  useEffect(() => {
    if (socket.connected) {
      socket.on("recieve_message", (data: ChatMessage) => {
        console.log("data", data);
        dispatch(handleRecieveMessage({ ...data, right: false }));
      });
    }
  }, [socket])
  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      const isEmojiPicker = showEmoji && (event.target as HTMLElement).closest('.emoji-picker-container');
      // const AttachFiles = showAttachFiles && (event.target as HTMLElement).closest('.attachedFiles');

      if (!isEmojiPicker) {
        setShowEmoji(false);
      }
      // if (AttachFiles) {
      //   dispatch(setShowAttachFiles(false))
      // }
    };
    document.body.addEventListener('click', closeDropdown);

    return () => {
      document.body.removeEventListener('click', closeDropdown);
    };
  }, [showEmoji]);

  return (
    <>
      <div className={` bg-[#202c33] transition-all ease-in-out duration-150 origin-bottom-right relative  w-full m-auto ${tagReply === true ? " scale-y-100  pt-2 " : "scale-y-0 h-0"}`}>
        <div className="bg-[#111b21] mr-[80px]  flex flex-col justify-center px-2 py-1 rounded-lg mx-8 border-l-4 border-green-500">
          <p className="text-[.91rem] text-green-500 line-clamp-1">user name</p>
          <p className="text-[.91rem] text-slate-500 line-clamp-1">this is text msg</p>
        </div>
        <div onClick={() => setTagReply(false)} className="absolute top-4 right-4 p-2  hover:bg-black rounded-full cursor-pointer">
          <RxCross2 size={25} className="text-white" title="cancel" />
        </div>
      </div>
      <form className="h-14 w-full" onSubmit={formik.handleSubmit}>
        <div className="bg-[#202c33] text-white h-14 px-4 flex items-center gap-6 ">
          <>
            <div className="flex">
              <div className="icons" onClick={handleEmojiPicker}>
                <BsEmojiSmile title="Emoji" id="emoji-open" />
              </div>
              <div className={`emoji-picker-container ${showEmoji ? 'show-emoji-picker w-auto h-auto' : ''}`}>
                <EmojiPicker onEmojiClick={handleAddEmoji} theme={Theme.DARK} />
              </div>

              <div onClick={() => { dispatch(setShowAttachFiles(!showAttachFiles)) }}
                className="icons">
                <ImAttachment title="Attach file" />
              </div>
            </div>
            <div className=" w-full rounded-lg h-14 flex items-center">
              <input type="text" placeholder="Type a message"
                className="bg-[#111b21] text-white w-full font-sans focus:outline-none h-10 px-5 py-4 rounded-lg"
                onChange={formik.handleChange("message")} onBlur={formik.handleBlur("message")} value={formik.values.message} />
            </div>
            <div className="flex w-10 items-center justify-center">
              {
                formik.values.message !== '' ? (
                  <button className="icons" type="submit" >
                    <MdSend title="send" />
                  </button>
                ) : (
                  <button className="icons">
                    <FaMicrophone title="Record" />
                  </button>
                )
              }

            </div>
          </>
        </div>

      </form>

    </>
  );
};

export default MessageBar;
