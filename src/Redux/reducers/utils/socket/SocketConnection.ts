import { io, Socket } from "socket.io-client";
import { refreshSession } from "../axiosClient";

/**
 * The server authenticates the handshake with the httpOnly access cookie, so the
 * client sends credentials instead of a token it should never have been able to read.
 * If the cookie is expired we rotate the refresh token once and retry the handshake.
 */
const createSocket = (url: string): Promise<Socket> => {
    return new Promise<Socket>((resolve, reject) => {
        const socket = io(url, {
            autoConnect: false,
            withCredentials: true,
        });

        let retriedAfterRefresh = false;

        socket.on("connect", () => resolve(socket));

        socket.on("connect_error", async (error) => {
            if (!retriedAfterRefresh) {
                retriedAfterRefresh = true;
                try {
                    await refreshSession();
                    socket.connect();
                    return;
                } catch {
                    // fall through, the session is really gone.
                }
            }
            console.error(`Socket connection error on ${url}:`, error.message);
            socket.close();
            reject(error);
        });

        socket.on("disconnect", (reason) => {
            console.warn(`Socket disconnected: ${reason}`);
        });

        socket.connect();
    });
};

export default createSocket
