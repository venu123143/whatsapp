
import axios from "axios";
import { base_url } from "../../../static/Static";


const upateUser = async (id: string, value: { name?: string, about?: string }) => {
    const res = await axios.put(`${base_url}/users/updateuser/${id}`, value, { withCredentials: true })    
    if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data))
        return res.data
    }
}

const reset = async (token: string, password: string) => {
    const res = await axios.put(`${base_url}/users/resetpassword/${token}`, { password })
    return res.data
}
const sendotp = async (mobile: string) => {
    const res = await axios.post(`${base_url}/users/sendotp`, { mobile })
    return res.data
}
const verifyOtp = async (mobile: string, otp: string[]) => {
    const res = await axios.post(`${base_url}/users/verifyotp`, { mobile, otp }, { withCredentials: true })
    if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data?.user))
        return res.data
    }
}
const logout = async (): Promise<any> => {
    const res = await axios.get(`${base_url}/users/logout`, { withCredentials: true, })
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
    logout
}

export default userService