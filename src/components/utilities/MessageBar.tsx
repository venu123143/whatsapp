
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { useEffect, useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store"
import {
  handleEmojiClick,
  setShowAttachFiles,
  handleSendMessage,
} from "../../Redux/reducers/utils/utilReducer"
// import { FaMicrophone } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useFormik } from "formik";
import { FaMicrophone } from "react-icons/fa6";

const MessageBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { showAttachFiles, userName, about } = useSelector((store: RootState) => store.utils);
  const { socket } = useSelector((store: RootState) => store.features);

  // const { io } = useSelector((state: RootState) => state.socket);
  // const { activeChat } = useSelector((state: RootState) => state.feature);

  const [showEmojiPicker] = useState<boolean>(false);
  const [tagReply, setTagReply] = useState<boolean>(false);
  // const [showAttachFiles, setShowAttachFiles] = useState<boolean>(true);

  // io.on("connect", () => {
  //   console.log(`socket id is ${io.id}`);
  // });
  // const handleEmojiModal = () => {
  //   setShowEmojiPicker(!showEmojiPicker);
  // };
  // const addMessageToconversation = ({ message }: any) => {
  //   dispatch(handleSendMessageInput(message));
  // };
  const formik = useFormik({
    initialValues: {
      message: '',
      date: new Date(),
    },
    onSubmit: async (values) => {
      if (values.message !== '') {
        const serializedValues = {
          message: values.message,
          date: values.date.toISOString(),
          author: userName,
          room: about,
          right: true
        };
        await socket.emit("send_message", serializedValues)
        dispatch(handleSendMessage(serializedValues));
        formik.resetForm()
      }
    }
  })

  useEffect(() => {
    socket.on("recieve_message", (data: any) => {
      console.log(data);
      dispatch(handleSendMessage({ ...data, right: false }));


    })
  }, [socket])

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
              <div className="icons" onClick={() => setTagReply(!tagReply)}>
                <BsEmojiSmile title="Emoji" id="emoji-open" />
              </div>
              {showEmojiPicker ? (
                <div className="absolute bottom-24 left-16 z-40">
                  <EmojiPicker
                    onEmojiClick={(emoji) => dispatch(handleEmojiClick(emoji))}
                    theme={Theme.DARK}
                  />
                </div>
              ) : null}

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
