import React, { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader'
import MessageBar from './MessageBar'
import ChatPage from './ChatPage'

import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import EditMsg from '../cards/EditMsg';
import ContactInfo from '../../pages/ContactInfo';
import MsgRecoder from './MsgRecoder';


const Chat = ({ handleSendOffer, handleOffer, rejectCall, shouldFocus }: { handleSendOffer: () => void, handleOffer: () => void, rejectCall: () => void, shouldFocus: boolean }) => {
  const chatPageRef = useRef<HTMLDivElement | null>(null);
  const { friends, currentUserIndex, editMessage } = useSelector((state: RootState) => state.msg);
  const { isRecord } = useSelector((state: RootState) => state.features);



  useEffect(() => {
    if (chatPageRef.current) {
      chatPageRef.current.scrollTop = chatPageRef.current.scrollHeight;
    }
  }, [friends, currentUserIndex]);
  const scrollToMessage = (messageId: string) => {
    const messageElement = document.getElementById(`message-${messageId}`);
    if (messageElement && chatPageRef.current) {
      const chatWindowHeight = chatPageRef.current.clientHeight;
      const messageHeight = messageElement.clientHeight;
      const messageTop = messageElement.offsetTop;

      // Calculate the desired scroll position to center the message
      const scrollToPosition = messageTop - (chatWindowHeight - messageHeight) / 2;

      chatPageRef.current.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth',
      });
      messageElement.style.backgroundColor = 'rgba(135, 206, 250, 0.2)';
      setTimeout(() => {
        messageElement.style.transition = 'background-color 0.5s ease opacity 0.5s ease';
        messageElement.style.backgroundColor = '';
      }, 1000);
    }
  };
  // absolute top-0 left-0 right-0 bottom-0

  return (
    <>
      <div className=' h-screen flex flex-col backImg bg-black'>
        <ChatHeader handleSendOffer={handleSendOffer} />
        <div className='h-full overflow-y-auto custom-scrollbar bg-black bg-opacity-80 scroll-smoothS' ref={chatPageRef}>
          <ChatPage rejectCall={rejectCall} handleOffer={handleOffer} scrollToMessage={scrollToMessage} />
        </div>
        {
          isRecord === false ? <MessageBar shouldFocus={shouldFocus} /> : <MsgRecoder />
        }

        <EditMsg message={editMessage} />
        <ContactInfo />
      </div>
    </>
  )
}

export default React.memo(Chat)