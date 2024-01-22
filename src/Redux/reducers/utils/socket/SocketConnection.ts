
import { io, Socket } from "socket.io-client";
import { UserState } from "../../Auth/AuthReducer";

const createSocket = (user: UserState): Socket => {
    return io("http://localhost:5000", {
        autoConnect: false,
        withCredentials: true,
        auth: { token: user?.refreshToken }
    });
};

export default createSocket;