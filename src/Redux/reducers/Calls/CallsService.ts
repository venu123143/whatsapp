
import axios from "axios";

const updateCall = async (id: string, value: { status?: string, userId?: string, callDuration?: number }) => {
    const res = await axios.put(`${import.meta.env.VITE_API_CLIENT_URL}/calls/update-call/${id}`, value, { withCredentials: true })
    return res.data
}
const getCallsHistory = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_CLIENT_URL}/calls/get-calls-history/`, { withCredentials: true })
    return res.data
}
const getLiveCalls = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_CLIENT_URL}/calls/get-live-calls?status=live`, { withCredentials: true })
    return res.data
}
const createCall = async (title?: string, callType?: string, pin?: string) => {
    const res = await axios.post(`${import.meta.env.VITE_API_CLIENT_URL}/calls/create-call`, { title, callType, pin }, { withCredentials: true })
    return res.data
}

const callsService = {
    createCall,
    getLiveCalls,
    updateCall,
    getCallsHistory,
}

export default callsService