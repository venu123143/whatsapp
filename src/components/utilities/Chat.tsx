import React, { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader'
import MessageBar from './MessageBar'
import ChatPage from './ChatPage'
import image from "../../assets/chat-bg.png"
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

const Chat = () => {
  const chatPageRef = useRef<HTMLDivElement | null>(null);
  const { messageArray } = useSelector((state: RootState) => state.utils);
  useEffect(() => {
    if (chatPageRef.current) {
      chatPageRef.current.scrollTop = chatPageRef.current.scrollHeight;
    }
  }, [messageArray]);
  return (
    <>
      <div className='h-screen flex flex-col backImg bg-black'>
        <ChatHeader />
        <div className='h-full overflow-y-auto custom-scrollbar bg-black bg-opacity-80 scroll-smooth' ref={chatPageRef}>
          <ChatPage />
        </div>
        <MessageBar />
      </div>
    </>
  )
}

export default Chat