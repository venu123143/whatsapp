import React, { useEffect, useRef } from 'react';
import { Message } from "../interfaces/CallInterface"

interface CallChatProps {
    isChatOpen: boolean;
    chatRef: any;
    messages: Message[];
    currentMessage: string;
    setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: () => void;
}

const CallChat: React.FC<CallChatProps> = ({
    isChatOpen,
    chatRef,
    messages,
    currentMessage,
    setCurrentMessage,
    handleSendMessage
}) => {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (pageRef.current) {
            pageRef.current.scrollTop = pageRef.current.scrollHeight;
        }
    }, [messages, isChatOpen]);
    return (
        <>
            <div ref={chatRef}
                className={`${isChatOpen === true ? "translate-x-0  bottom-20 right-4" : "-translate-x-full "} absolute w-80 transition-all bg-white  h-96  rounded-lg shadow-lg flex flex-col`}>
                <div ref={pageRef} className="flex-1 overflow-y-auto p-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-2 ${msg.sender === 'local' ? 'text-right' : 'text-left'}`}
                        >
                            <span
                                className={`inline-block p-2 rounded-lg ${msg.sender === 'local'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-black'
                                    }`}
                            >
                                {msg.content}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="p-4 shadow-lg  border-t">
                    <div className="flex">
                        <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            className="flex-1 border rounded-l-lg p-2 focus:outline-none"
                            placeholder="Type a message..."
                        />
                        <button onClick={() => handleSendMessage()}
                            className="bg-blue-500 text-white font-Roboto font-bold rounded-r-lg px-4 py-2">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CallChat;
