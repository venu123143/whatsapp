import { io, Socket } from "socket.io-client";
import { UserState } from "../../Auth/AuthReducer";
// import { toast } from "react-toastify";

const createSocket = (user: UserState | null, url: string): Promise<Socket> => {
    const startTime = performance.now();  // Start time
    return new Promise<Socket>((resolve, reject) => {
        const socket = io(url, {
            autoConnect: false,
            withCredentials: true,
            auth: { token: user?.refreshToken },
        });
        socket.on('connect', () => {
            // const endTime = performance.now();  // End time
            // const duration = endTime - startTime;  // Calculate duration
            // toast.success(`${url.includes("calls") ? "call " : "chat "} connected successfully in ${duration.toFixed(2)} ms.`, { position: 'top-center' })
            resolve(socket);
        });
        socket.on('connect_error', (error) => {
            const endTime = performance.now();  // End time
            const duration = endTime - startTime;  // Calculate duration
            console.error(`Connection error after ${duration.toFixed(2)} ms:`, error);
            reject(error);
        });
        socket.on('disconnect', (reason) => {
            console.warn(`Socket disconnected: ${reason}`);
        });
        socket.on('close', (reason) => {
            console.warn(`Socket closed: ${reason}`);
        });
        socket.connect();
    });
};

export default createSocket
