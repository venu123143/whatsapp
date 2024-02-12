
import { io, Socket } from "socket.io-client";
import { UserState } from "../../Auth/AuthReducer";

const createSocket = (user: UserState | null): Promise<Socket> => {

    return new Promise<Socket>((resolve) => {
        const socket = io(import.meta.env.VITE_API_SOCKET_URL, {
            autoConnect: false,
            withCredentials: true,
            auth: { token: user?.refreshToken },
        });
        socket.on('connect', () => {
            resolve(socket);
        });
        socket.connect();
    });
};

export default createSocket;