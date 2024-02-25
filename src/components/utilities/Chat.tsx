import { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader'
import MessageBar from './MessageBar'
import ChatPage from './ChatPage'

import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

const Chat = () => {
  const chatPageRef = useRef<HTMLDivElement | null>(null);
  const { friends, currentUserIndex } = useSelector((state: RootState) => state.msg);

  useEffect(() => {
    if (chatPageRef.current) {
      chatPageRef.current.scrollTop = chatPageRef.current.scrollHeight;
    }
  }, [friends, currentUserIndex]);
  return (
    <>
      <div className=' sm:static absolute top-0 left-0 right-0 bottom-0 h-full flex flex-col backImg bg-black'>
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