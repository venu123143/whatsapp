
import api from "../utils/axiosClient";

const updateCall = async (id: string, value: { status?: string, userId?: string, callDuration?: number }) => {
    const res = await api.put(`/calls/update-call/${id}`, value)
    return res.data
}
const getCallsHistory = async () => {
    const res = await api.get(`/calls/get-calls-history/`)
    return res.data
}
const getLiveCalls = async () => {
    const res = await api.get(`/calls/get-live-calls?status=live`)
    return res.data
}
const createCall = async (title?: string, callType?: string, pin?: string) => {
    const res = await api.post(`/calls/create-call`, { title, callType, pin })
    return res.data
}

const callsService = {
    createCall,
    getLiveCalls,
    updateCall,
    getCallsHistory,
}

export default callsService