import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { ConnectionResult, handleRecieveMessage, handleSetAllUsersChat, IMessage } from '../../Redux/reducers/msg/MsgReducer';
import { Socket } from 'socket.io-client';
import { UserState } from '../../Redux/reducers/Auth/AuthReducer';
import RecieveRingtone from "../../static/incomming_msg.wav"

export const useGetAllMsgs = (socket: Socket, user: UserState) => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (socket.connected && user !== null) {
            if (socket.connected && user !== null) {
                socket.emit("get_all_messages", "message", (ack: any) => {
                    dispatch(handleSetAllUsersChat(ack.connections))
                });
            }
        }
        return () => {
            if (socket.connected) {
                socket.off("get_all_messages");
            }
        };
    }, [socket])
};

export const useRecieveMessage = (socket: Socket,friends: ConnectionResult[], currentUserIndex: null | number) => {
    const dispatch: AppDispatch = useDispatch()
    const incomingMsgSound = useRef(new Audio(RecieveRingtone));

    useEffect(() => {
        if (socket.connected) {
            socket.on("recieve_message", (data: IMessage) => {
                dispatch(handleRecieveMessage(data));
                if ((currentUserIndex !== null && data.room_id !== friends[currentUserIndex].room_id) || currentUserIndex === null) {
                    incomingMsgSound.current.currentTime = 0;
                    incomingMsgSound.current.play().catch((error) => {
                        console.error("Error playing the sound:", error);
                    });
                }
            });
        }
        // Cleanup function to close the socket connection
        return () => {
            if (socket.connected) {
                // socket.disconnect();
                socket.off("recieve_message");
            }
        };
    }, [socket]);

}

