
import api from "../utils/axiosClient";
// import { base_url } from "../../../static/Static";


const allUsers = async (): Promise<any> => {
    const res = await api.get(`/users/`)
    return res.data
}

const allGroups = async (): Promise<any> => {
    const res = await api.get(`/groups/getall`)
    return res.data
}

const getGroup = async (data: any) => {
    const res = await api.get(`/groups/${data.groupId}`)
    return res.data
}

const updateGroup = async (data: any) => {
    const res = await api.put(`/groups/${data.groupId}`, data)
    return res.data
}

const createGroup = async (data: any) => {
    const res = await api.post(`/groups/create`, data)
    return res.data
}

const msgService = {
    allUsers,
    allGroups,
    updateGroup,
    getGroup,
    createGroup
}

export default msgService