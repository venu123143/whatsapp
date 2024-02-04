
import axios from "axios";
import { base_url } from "../../../static/Static";


const allUsers = async (): Promise<any> => {
    const res = await axios.get(`${base_url}/users/`, { withCredentials: true })
    return res.data
}

const allGroups = async (): Promise<any> => {
    const res = await axios.get(`${base_url}/groups/getall`, { withCredentials: true })
    return res.data
}

const getGroup = async (data: any) => {
    const res = await axios.get(`${base_url}/groups/${data.groupId}`)
    return res.data
}

const updateGroup = async (data: any) => {
    const res = await axios.put(`${base_url}/groups/${data.groupId}`, data, { withCredentials: true })
    return res.data
}

const createGroup = async (data: any) => {
    const res = await axios.post(`${base_url}/groups/create`, data, { withCredentials: true })
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