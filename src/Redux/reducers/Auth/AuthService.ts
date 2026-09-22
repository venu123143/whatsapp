import api from "../utils/axiosClient";

/** Cached copy of the user so a reload can paint before /me answers. Never a token. */
export const USER_STORAGE_KEY = "user";
const SESSION_ID_KEY = "sessionId";

export const readCachedUser = () => {
    try {
        const cached = localStorage.getItem(USER_STORAGE_KEY);
        return cached ? JSON.parse(cached) : null;
    } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
        return null;
    }
};

export const cacheUser = (user: unknown) => {
    if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const clearCachedUser = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    // the legacy key held the access token, drop it wherever it still lingers.
    localStorage.removeItem("token");
};

const upateUser = async (id: string, value: { name?: string, about?: string }) => {
    const res = await api.put(`/users/updateuser/${id}`, value)
    cacheUser(res.data)
    return res.data
}

const uploadProfilePicture = async (picture: any, userId: string) => {
    const res = await api.put(`/users/updateprofile/${userId}`, picture)
    cacheUser(res.data)
    return res.data
}

const reset = async (token: string, password: string) => {
    const res = await api.put(`/users/resetpassword/${token}`, { password })
    return res.data
}

const sendotp = async (mobile: string) => {
    const res = await api.post(`/users/sendotp`, { mobile })
    const sessionId = res.headers['sessionid'];
    if (sessionId) {
        localStorage.setItem(SESSION_ID_KEY, sessionId);
    }
    return res.data
}

const verifyOtp = async (otp: string[]) => {
    const sessionId = localStorage.getItem(SESSION_ID_KEY);
    const headers = sessionId ? { sessionid: sessionId } : undefined;

    const res = await api.post(`/users/verifyotp`, { otp }, { headers })
    // the access + refresh cookies are set by the server; we only keep the profile.
    localStorage.removeItem(SESSION_ID_KEY)
    cacheUser(res.data?.user)
    return res.data
}

/** Rehydrates the session on page load using whichever cookie is still valid. */
const getMe = async () => {
    const res = await api.get(`/users/me`)
    cacheUser(res.data?.user)
    return res.data?.user
}

const logout = async (): Promise<any> => {
    try {
        const res = await api.post(`/users/logout`)
        return res.data
    } finally {
        // local state is cleared even if the network call fails.
        clearCachedUser()
    }
}

const logoutAllDevices = async (): Promise<any> => {
    try {
        const res = await api.post(`/users/logout-all`)
        return res.data
    } finally {
        clearCachedUser()
    }
}

const userService = {
    upateUser,
    reset,
    sendotp,
    verifyOtp,
    getMe,
    logout,
    logoutAllDevices,
    uploadProfilePicture
}

export default userService
