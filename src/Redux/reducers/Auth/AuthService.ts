
import axios from "axios";

const upateUser = async (id: string, value: { name?: string, about?: string }) => {
    const res = await axios.put(`${import.meta.env.VITE_API_CLIENT_URL}/users/updateuser/${id}`, value, { withCredentials: true })
    if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data))
        return res.data
    }
}
const uploadProfilePicture = async (picture: any, userId: string) => {
    const res = await axios.put(`${import.meta.env.VITE_API_CLIENT_URL}/users/updateprofile/${userId}`, picture, { withCredentials: true })
    if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data))
        return res.data
    }
}
const reset = async (token: string, password: string) => {
    const res = await axios.put(`${import.meta.env.VITE_API_CLIENT_URL}/users/resetpassword/${token}`, { password })
    return res.data
}
const sendotp = async (mobile: string) => {
    const res = await axios.post(`${import.meta.env.VITE_API_CLIENT_URL}/users/sendotp`, { mobile })
    const sessionId = res.headers['sessionid'];
    if (sessionId) {
        localStorage.setItem('sessionId', sessionId);
    }
    return res.data
}
const verifyOtp = async (otp: string[]) => {
    const sessionId = localStorage.getItem("sessionId");
    const headers = {} as any;
    if (sessionId) {
        headers["sessionid"] = sessionId;
    }
    const res = await axios.post(`${import.meta.env.VITE_API_CLIENT_URL}/users/verifyotp`,
        { otp }, { headers: headers, withCredentials: true })
    if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data?.user))
        return res.data
    }
}
const logout = async (): Promise<any> => {
    const res = await axios.get(`${import.meta.env.VITE_API_CLIENT_URL}/users/logout`, { withCredentials: true })
    if (res.data) {
        localStorage.removeItem("token");
    }
    return res.data
}
const userService = {
    upateUser,
    reset,
    sendotp,
    verifyOtp,
    logout,
    uploadProfilePicture
}

export default userService