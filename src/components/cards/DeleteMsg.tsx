import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { IMessage, updateChatMessage } from "../../Redux/reducers/msg/MsgReducer";
import { SocketContext } from "../../App";
import { toggleDeleteMessage } from "../../Redux/reducers/utils/Features";

const DeleteConfirmationPopup = ({ message }: { message: IMessage }) => {
    const dispatch: AppDispatch = useDispatch();
    const { deleteMsg } = useSelector((store: RootState) => store.features);
    const [isLoading, setIsLoading] = useState(false);
    const socket = useContext(SocketContext);

    const handleDeleteMsg = () => {
        setIsLoading(true);
        if (socket.connected) {
            socket.emit("delete_message", message, (ack: any) => {
                setIsLoading(false);
                dispatch(updateChatMessage(ack));
                dispatch(toggleDeleteMessage(false));
            });
        }
    };

    // useEffect should not be conditionally rendered. Instead, check inside the effect.
    useEffect(() => {
        if (socket.connected) {
            const handleDeleteMessage = (chat: any) => {
                dispatch(updateChatMessage(chat));
                setIsLoading(false);
                dispatch(toggleDeleteMessage(false));
            };

            socket.on("delete_msg", handleDeleteMessage);

            return () => {
                if (socket.connected) {
                    socket.off("delete_msg", handleDeleteMessage);
                }
            };
        }
    }, [socket]);

    const cancelMsg = () => {
        setIsLoading(false);
        dispatch(toggleDeleteMessage(false));
    };

    return (
        <div className={`${deleteMsg === false ? "hidden" : "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"}`}>
            <div className="bg-gray-800 rounded-lg shadow-lg w-96 p-6">
                <h2 className="text-white text-lg font-semibold mb-4">Delete Chat?</h2>
                <p className="text-gray-400 mb-6">
                    Are you sure you want to delete this chat? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
                        onClick={cancelMsg}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-500 focus:outline-none"
                        onClick={handleDeleteMsg}
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(DeleteConfirmationPopup);
