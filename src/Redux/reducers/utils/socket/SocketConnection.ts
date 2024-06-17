import { io, Socket } from "socket.io-client";
import { UserState } from "../../Auth/AuthReducer";

const createSocket = (user: UserState | null, url:string): Promise<Socket> => {

    return new Promise<Socket>((resolve) => {
        const socket = io(url, {
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