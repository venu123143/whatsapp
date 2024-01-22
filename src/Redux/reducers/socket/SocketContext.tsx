import { useEffect } from "react";
import createSocket from "../utils/socket/SocketConnection"
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { UserState, handleUser } from "../Auth/AuthReducer";

const useSocket = (user: UserState) => {

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const socket = createSocket(user);
        socket.connect()
        socket.on("connect_error", () => {
            console.log("on conn error");
            dispatch(handleUser(null));
        });

        return () => {
            console.log("off conn");
            socket.off("connect_error");
        };
    }, [dispatch, user]);
};

export default useSocket


