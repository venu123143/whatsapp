import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { ChatMessage, CommonProperties, handleRecieveMessage, handleSetAllUsersChat, handleSetFriends, handleUpdateSeen, makeUnreadCountZero } from '../../Redux/reducers/msg/MsgReducer';
import { Socket } from 'socket.io-client';
import { UserState } from '../../Redux/reducers/Auth/AuthReducer';
import RecieveRingtone from "../../static/incomming_msg.wav"

export const useGetAllMsgs = (socket: Socket, user: UserState) => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (socket.connected && user !== null) {
            // socket.emit("get_frnds_on_reload", user)
            socket.emit("get_all_messages", "friends")
            socket.on("get_friends", (friends) => {
                dispatch(handleSetFriends(friends))
            })
            socket.on("get_all_messages_on_reload", (friends) => {
                dispatch(handleSetAllUsersChat(friends))
            })
        }
        return () => {
            if (socket.connected) {
                socket.off("get_friends");
                socket.off("get_all_messages_on_reload")
            }
        };
    }, [socket])

};

export const useRecieveMessage = (socket: Socket, users: CommonProperties[], lstMsg: any, setLstMsg: React.Dispatch<any>, friends: CommonProperties[], currentUserIndex: null | number) => {
    const dispatch: AppDispatch = useDispatch()
    const incomingMsgSound = useRef(new Audio(RecieveRingtone));

    useEffect(() => {
        if (socket.connected) {
            socket.on("recieve_message", (data: ChatMessage) => {
                const findUserIndex = friends.length > 0 ? friends.findIndex((friend: any) => friend.socket_id === lstMsg.recieverId) : -1
                // console.log(findUserIndex, currentUserIndex);

                if (findUserIndex > 0 && findUserIndex !== currentUserIndex) {
                    incomingMsgSound.current.play();
                }
                setLstMsg({ ...data, right: false })
                dispatch(handleRecieveMessage({ ...data, right: false }));
            });
            socket.on("update_view", (data: ChatMessage) => {
                dispatch(handleUpdateSeen(data))
            });

            if (lstMsg !== null) {
                let findUserIndex;
                if (lstMsg.conn_type === "group") {
                    findUserIndex = friends.length > 0 ? friends.findIndex((friend: any) => friend.socket_id === lstMsg.recieverId) : -1
                } else {
                    findUserIndex = friends.length > 0 ? friends.findIndex((friend: any) => friend.socket_id === lstMsg.senderId) : -1
                }
                if (findUserIndex === -1) {
                    const user = users.find((user: CommonProperties) => user.socket_id === lstMsg.senderId);
                    if (user) {
                        socket.emit("add_friend", user);
                        socket.on("get_friends", (friend) => {
                            dispatch(handleSetFriends(friend))
                        });
                    }
                }
                if (friends[0]?.socket_id === lstMsg.senderId && currentUserIndex === 0) {
                    dispatch(makeUnreadCountZero())
                    socket.emit("update_seen", [lstMsg])
                }
            }
        }
        // Cleanup function to close the socket connection
        return () => {
            if (socket.connected) {
                // socket.disconnect();
                socket.off("recieve_message");
                socket.off("update_view");
                socket.off("get_friends");
            }
        };
    }, [socket, lstMsg]);

}

