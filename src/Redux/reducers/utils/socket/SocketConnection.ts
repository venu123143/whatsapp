import { io, Socket } from "socket.io-client";
import { UserState } from "../../Auth/AuthReducer";

const createSocket = (user: UserState | null, url: string): Promise<Socket> => {
    const startTime = performance.now();  // Start time

    return new Promise<Socket>((resolve, reject) => {
        const socket = io(url, {
            autoConnect: false,
            withCredentials: true,
            auth: { token: user?.refreshToken },
        });
        socket.on('connect', () => {
            const endTime = performance.now();  // End time
            const duration = endTime - startTime;  // Calculate duration
            console.log(`Socket connected successfully in ${duration.toFixed(2)} ms.`);
            resolve(socket);
        });
        socket.on('connect_error', (error) => {
            const endTime = performance.now();  // End time
            const duration = endTime - startTime;  // Calculate duration
            console.error(`Connection error after ${duration.toFixed(2)} ms:`, error);
            reject(error);
        });
        socket.connect();
    });
};

export default createSocket
