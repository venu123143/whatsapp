import { io, Socket } from "socket.io-client";
import { refreshSession, SESSION_EXPIRED_EVENT } from "../axiosClient";

const CONNECT_TIMEOUT_MS = 10_000;
const INITIAL_RECONNECTION_ATTEMPTS = 5;
const RECONNECTION_DELAY_MS = 1_000;
const RECONNECTION_DELAY_MAX_MS = 10_000;

type HandshakeError = Error & { data?: { code?: string } };

/** The server tags handshake rejections that no amount of retrying can fix. */
const isAuthError = (error: HandshakeError) =>
    error.data?.code === "SOCKET_AUTH_FAILED" || /not authorized|token/i.test(error.message);

const configureReconnection = (socket: Socket, attempts: number) => {
    socket.io.reconnection(true);
    socket.io.reconnectionAttempts(attempts);
    socket.io.reconnectionDelay(RECONNECTION_DELAY_MS);
    socket.io.reconnectionDelayMax(RECONNECTION_DELAY_MAX_MS);
};

/**
 * The server authenticates the handshake with the httpOnly access cookie.
 *
 * Connecting over websocket directly avoids the polling handshake plus upgrade
 * probe: when the server rejected the handshake, the engine session was torn down
 * while that probe was still in flight, which is where the `400` on
 * `transport=websocket&sid=...` came from, and the open polling transport kept
 * issuing requests in a loop. socket.io-client 4.7 does not fall back on its own
 * when a websocket attempt fails, so the fallback below is explicit.
 *
 * Reconnection is off until we are connected, because the built-in loop would
 * retry an auth rejection forever alongside our own refresh-and-retry. Auth
 * rejections are handled on reconnects too, so an expired token ends the session
 * instead of starting that loop again.
 */
const createSocket = (url: string): Promise<Socket> => {
    return new Promise<Socket>((resolve, reject) => {
        const socket: Socket = io(url, {
            autoConnect: false,
            withCredentials: true,
            transports: ["websocket", "polling"],
            reconnection: false,
            timeout: CONNECT_TIMEOUT_MS,
        });

        let settled = false;
        let refreshAttempted = false;
        let pollingFallbackAttempted = false;
        let retryingWithBackoff = false;

        const rejectOnce = (error: Error) => {
            if (settled) return;
            settled = true;
            reject(error);
        };

        /** Nothing left to try: stop every retry and send the app back to login. */
        const endSession = (error: Error) => {
            socket.io.reconnection(false);
            socket.close();
            window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
            rejectOnce(error);
        };

        socket.on("connect", () => {
            // a token that expires later may legitimately need another refresh.
            refreshAttempted = false;
            if (settled) return;
            settled = true;
            // authenticated: keep retrying network drops, with a capped backoff.
            configureReconnection(socket, Infinity);
            resolve(socket);
        });

        socket.on("connect_error", async (error: HandshakeError) => {
            // auth rejections are handled whether this is the first handshake or a
            // reconnect, otherwise the manager retries a rejection forever.
            if (isAuthError(error)) {
                if (refreshAttempted) return endSession(error);

                refreshAttempted = true;
                try {
                    await refreshSession();
                    socket.connect();
                } catch {
                    endSession(error);
                }
                return;
            }

            // past this point the manager owns the retries for an established socket.
            if (settled) return;

            if (!pollingFallbackAttempted) {
                // websocket is blocked somewhere on the path, try long polling.
                pollingFallbackAttempted = true;
                console.warn(`Socket websocket transport failed on ${url}, falling back to polling`);
                socket.io.opts.transports = ["polling", "websocket"];
                socket.connect();
                return;
            }

            if (!retryingWithBackoff) {
                // neither transport got through: retry a bounded number of times so
                // the caller's promise settles instead of hanging forever.
                retryingWithBackoff = true;
                console.warn(`Socket transport error on ${url}: ${error.message}, retrying`);
                configureReconnection(socket, INITIAL_RECONNECTION_ATTEMPTS);
                socket.io.once("reconnect_failed", () => {
                    socket.close();
                    rejectOnce(error);
                });
                socket.connect();
            }
        });

        socket.on("disconnect", (reason) => {
            console.warn(`Socket disconnected from ${url}: ${reason}`);
        });

        socket.connect();
    });
};

export default createSocket
