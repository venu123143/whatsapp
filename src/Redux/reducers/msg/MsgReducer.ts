
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import msgService from "./MsgService";
import { UserState } from "../Auth/AuthReducer";
// import { dummyMessages } from "../../../static/Static"


// const getUserFromLocalStorage = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') as string) : null

export interface AppState {
    currentUserIndex: any;
    isCurrentLoading: boolean;
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
    isCurrentLoading: false,
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
            state.isCurrentLoading = false
            state.chatSearchValue = ""
            // state.friends['currentUserIndex'].
        },
        setCurrentLoading: (state, action) => {
            state.isCurrentLoading = action.payload;
        },
        handleSendMessage: (state, action: PayloadAction<ChatMessage>) => {
            // state.friends[state.currentUserIndex].chat.push(action.payload)
            // state.friends[state.currentUserIndex].lastMessage = action.payload
            const { currentUserIndex } = state;
            const updatedFriends = [...state.friends];
            const updatedChat = [...updatedFriends[currentUserIndex].chat, action.payload];
            updatedFriends[currentUserIndex] = {
                ...updatedFriends[currentUserIndex],
                chat: updatedChat,
                lastMessage: action.payload
            };
            state.friends = updatedFriends;
        },
        handleRecieveMessage: (state, action: PayloadAction<ChatMessage>) => {
            const updatedFriends = [...state.friends];
            const payload = action.payload;

            const friend = payload.conn_type === "group" ?
                updatedFriends.find(frnd => frnd.socket_id === payload.recieverId) :
                updatedFriends.find(frnd => frnd.socket_id === payload.senderId);

            if (friend) {
                friend.chat.push(payload);
                friend.lastMessage = payload;
            }
            updatedFriends.sort((a, b) => {
                const lastMessageA = a.lastMessage;
                const lastMessageB = b.lastMessage;
                if (!lastMessageA && !lastMessageB) {
                    return 0;
                } else if (!lastMessageA) {
                    return 1;
                } else if (!lastMessageB) {
                    return -1;
                } else {
                    return new Date(lastMessageB.date).getTime() - new Date(lastMessageA.date).getTime();
                }
            });

            state.friends = updatedFriends;

        },
        handleUpdateSeen: (state, action: PayloadAction<ChatMessage>) => {
            const { recieverId, message } = action.payload;

            // Find the friend whose chat contains the message
            const friend = state.friends.find(frnd => frnd.socket_id === recieverId);

            if (friend) {
                // Update the seen status of the message in the friend's chat
                friend.chat.forEach((msg: any, index: number) => {
                    if (msg.message === message) {
                        friend.chat[index] = { ...msg, seen: true }; // Update seen status
                    }
                });
            }
        },

        handleSetFriends: (state, action) => {
            state.friends = action.payload
            state.isLoading = false
        },
        handleSortBylastMsg: (state) => {
            state.friends.sort((a: any, b: any) => {
                if (!a.lastMessage && !b.lastMessage) {
                    return 0;
                } else if (!a.lastMessage) {
                    return 1;
                } else if (!b.lastMessage) {
                    return -1;
                } else {
                    return new Date(b.lastMessage.date as string).getTime() - new Date(a.lastMessage.date as string).getTime();
                }
            });
            state.currentUserIndex = 0
        },
        handleSetStatus: (state, action) => {
            const frnd = state.friends.filter(frnd => frnd.socket_id === action.payload.recieverId)
            frnd[0].online_status = action.payload?.status
        },
        updateLastMessage: (state, action) => {
            const frnd = state.friends.filter(frnd => frnd.socket_id === action.payload.recieverId)
            frnd[0].lastMessage = action.payload
        },
        handleSetAllUsersChat: (state, action) => {
            state.friends = action.payload
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

export const { handleSendMessage, handleSortBylastMsg, handleUpdateSeen, handleSetStatus, handleSetAllUsersChat,
    updateLastMessage, handleRecieveMessage, handleSetFriends, toggleCreateGroup, setCurrentLoading,
    storeSelectedUsers, handleChatSearchValue, setCurrentGrpOrUser } = msgSlice.actions
export default msgSlice.reducer