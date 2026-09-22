import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const API_URL = import.meta.env.VITE_API_CLIENT_URL as string;

/** Fired when the refresh token is gone/expired and the user has to log in again. */
export const SESSION_EXPIRED_EVENT = "auth:session-expired";

type RetriableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

/**
 * Every API call goes through this instance so a single 401 handler can refresh
 * the 1 day access token with the 45 day refresh cookie. Both cookies are httpOnly,
 * so the browser attaches them and JS never touches a token.
 */
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Hitting these with an expired session must NOT trigger a refresh attempt,
// otherwise a failed refresh would recurse.
const NO_REFRESH_PATHS = ["/users/sendotp", "/users/verifyotp", "/users/refresh", "/users/logout"];

let refreshRequest: Promise<void> | null = null;

/** Single flight: parallel 401s wait on one refresh call, and one rotation. */
const refreshSession = (): Promise<void> => {
    if (!refreshRequest) {
        refreshRequest = axios
            .post(`${API_URL}/users/refresh`, {}, { withCredentials: true })
            .then(() => undefined)
            .finally(() => {
                refreshRequest = null;
            });
    }
    return refreshRequest;
};

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const request = error.config as RetriableRequest | undefined;
        const isAuthPath = NO_REFRESH_PATHS.some((path) => request?.url?.includes(path));

        if (error.response?.status !== 401 || !request || request._retry || isAuthPath) {
            return Promise.reject(error);
        }

        request._retry = true;
        try {
            await refreshSession();
            return api(request);
        } catch (refreshError) {
            window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
            return Promise.reject(refreshError);
        }
    }
);

export { refreshSession };
export default api;
