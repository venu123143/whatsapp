
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import msgService from "./MsgService";
import { UserState } from "../Auth/AuthReducer";
// import { dummyMessages } from "../../../static/Static"


// const getUserFromLocalStorage = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') as string) : null

export interface AppState {
    currentUserIndex: any;
    chatSearchValue: string;
    screen: boolean;
    users: CommonProperties[];
    groups: IGroup[];
    friends: CommonProperties[];
    singleGroup: IGroup | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
    address: boolean;
    userName: string;
    createGrp: boolean;
    selectedUsersToGroup: any;
}
export interface CommonProperties {
    socket_id: string;
    _id?: string | null;
    name?: string;
    about: string;
    profile: string;
    email: string | null;
    mobile?: string | null;
    chat: any;
    online_status?: boolean | string;
    users?: UserState[],
    lastMessage: any;
}

export interface IGroup extends CommonProperties {
    status: string;
    description: string;
    users: UserState[]
    admins: UserState[]
    maxUsers: number;
    createdBy: UserState
}

const initialState: AppState = {
    chatSearchValue: "",
    screen: false,
    users: [],
    groups: [],
    friends: [],
    singleGroup: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    address: false,
    createGrp: false,
    userName: "",
    selectedUsersToGroup: [],
    currentUserIndex: null,
};
export interface ChatMessage {
    message: string;
    date: string;
    right: boolean;
    msgType: string;
    senderId: string;
    recieverId: string;
    conn_type: string;
    seen: boolean;
    image?: any
}
export const getAllUsers = createAsyncThunk('authSlice/getallUsers', async (_, thunkAPI) => {
    try {
        const res = await msgService.allUsers()
        return res

    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const getAllGroups = createAsyncThunk('authSlice/getAllGroups', async (_, thunkAPI) => {
    try {
        const res = await msgService.allGroups()
        return res

    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const getGroup = createAsyncThunk('userSlice/getGroup', async (data: any, thunkAPI) => {
    try {
        return await msgService.getGroup(data)
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data)

    }
})

export const updateGroup = createAsyncThunk('authSlice/updateGroup', async (data: string, thunkAPI) => {
    try {
        const res = await msgService.updateGroup(data)
        return res
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

export const createGroup = createAsyncThunk('authSlice/createGroup', async (data: { name: string, users: string[], profile?: string }, thunkAPI) => {
    try {
        const res = await msgService.createGroup(data)
        return res

    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})


const msgSlice = createSlice({
    name: 'msgSlice',
    initialState,
    reducers: {
        toggleCreateGroup: (state, action) => {
            state.createGrp = action.payload
        },
        storeSelectedUsers: (state, action) => {
            state.selectedUsersToGroup = action.payload
        },
        handleChatSearchValue: (state, action: PayloadAction<string>) => {
            state.chatSearchValue = action.payload;
        },
        setCurrentGrpOrUser: (state, action) => {
            state.currentUserIndex = action.payload;
            state.chatSearchValue = ""
        },
        handleSendMessage: (state, action: PayloadAction<ChatMessage>) => {
            state.friends[state.currentUserIndex].chat.push(action.payload)
        },
        handleRecieveMessage: (state, action: PayloadAction<ChatMessage>) => {
            if (action.payload.conn_type === "group") {
                const frnd = state.friends.filter(frnd => frnd.socket_id === action.payload.recieverId)
                frnd[0].chat.push(action.payload)
            } else {
                const frnd = state.friends.filter(frnd => frnd.socket_id === action.payload.senderId)
                frnd[0].chat.push(action.payload)
                frnd[0].lastMessage = action.payload
            }
        },
        handleUpdateSeen: (state, action: PayloadAction<ChatMessage>) => {
            const frnd = state.friends.filter(frnd => frnd.socket_id === action.payload.recieverId)
            frnd[0].chat.map((msg: ChatMessage, index: number) => {
                if (msg.message === action.payload.message) {
                    return frnd[0].chat[index] = action.payload
                }
            })
        },
        handleSetFriends: (state, action) => {
            state.friends = action.payload
        },
        handleSetStatus: (state, action) => {
            const frnd = state.friends.filter(frnd => frnd.socket_id === action.payload.recieverId)
            frnd[0].online_status = action.payload?.status
        },
        updateLastMessage: (state, action) => {
            const frnd = state.friends.filter(frnd => frnd.socket_id === action.payload.recieverId)
            frnd[0].lastMessage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllUsers.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.users = action.payload
        }).addCase(getAllUsers.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(getAllGroups.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllGroups.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.groups = action.payload
        }).addCase(getAllGroups.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(getGroup.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        }).addCase(getGroup.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.singleGroup = action.payload
            state.message = action.payload?.message
            toast.success(state.message, {
                position: 'top-right'
            })
        }).addCase(getGroup.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload?.message
            state.singleGroup = null
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(updateGroup.pending, (state) => {
            state.isLoading = true
        }).addCase(updateGroup.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload?.message
            toast.success(state.message, {
                position: 'top-left'
            })
        }).addCase(updateGroup.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-left'
            })
        })
        builder.addCase(createGroup.pending, (state) => {
            state.isLoading = true
        }).addCase(createGroup.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.createGrp = false
            state.singleGroup = action.payload
            toast.success("Your group is created sucessfully.", {
                position: 'top-left'
            })
        }).addCase(createGroup.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-left'
            })
        })
    }

})

export const { handleSendMessage, handleUpdateSeen, handleSetStatus, updateLastMessage, handleRecieveMessage, handleSetFriends, toggleCreateGroup, storeSelectedUsers, handleChatSearchValue, setCurrentGrpOrUser } = msgSlice.actions
export default msgSlice.reducer