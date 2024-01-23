import { useEffect } from "react";
import createSocket from "../utils/socket/SocketConnection"
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { UserState, handleUser } from "../Auth/AuthReducer";
import { toast } from "react-toastify";

const useSocket = (user: UserState | null) => {
    const dispatch: AppDispatch = useDispatch();
    const socket = createSocket(user);
    useEffect(() => {
        socket.connect()
        socket.on("connect_error", (error: any) => {
            console.log("on conn error", error);
            toast.error("socket connect error", { position: 'top-right' })
            dispatch(handleUser(null));
        });

        return () => {
            console.log("off conn");
            socket.off("connect_error");
        };
    }, [dispatch, user]);

    return socket
};

export default useSocket


