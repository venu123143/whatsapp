
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
    replyMessage: any;
    contactInfo: boolean;
    editMessage: any;
    isRecord: boolean;
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
    admins?: UserState[],
    lastMessage: any;
    unreadCount: number;
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
    replyMessage: null,
    editMessage: null,
    contactInfo: false,
    isRecord: false
};
export interface ChatMessage {
    message: string;
    date: string;
    right: boolean;
    msgType: string;
    senderId: string
    recieverId: string;
    conn_type: string;
    seen: boolean;
    image?: any
    users?: UserState[];
    senderName?: string;
    replyFor?: any
}
export const getAllUsers = createAsyncThunk('authSlice/getallUsers', async (_, thunkAPI) => {
    try {
        const res = await msgService.allUsers()
        return res

    } catch (error: any) {
        localStorage.removeItem("token")
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const getAllGroups = createAsyncThunk('authSlice/getAllGroups', async (_, thunkAPI) => {
    try {
        const res = await msgService.allGroups()
        return res

    } catch (error: any) {
        localStorage.removeItem("token")
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

export const createGroup = createAsyncThunk('authSlice/createGroup', async (data: FormData, thunkAPI) => {
    try {
        const res = await msgService.createGroup(data)
        return res

    } catch (error: any) {
        localStorage.removeItem("token")
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
        toggleContactInfo: (state, action) => {
            state.contactInfo = action.payload
        },
        setCurrentGrpOrUser: (state, action) => {
            state.currentUserIndex = action.payload;
            state.isCurrentLoading = false
            state.chatSearchValue = ""
            state.contactInfo = false
            if (state.currentUserIndex !== null) {
                state.friends[state.currentUserIndex].unreadCount = 0
            }
        },
        setCurrentLoading: (state, action) => {
            state.isCurrentLoading = action.payload;
        },
        handleSendMessage: (state, action: PayloadAction<ChatMessage>) => {
            // state.friends[state.currentUserIndex].chat.push(action.payload)
            // state.friends[state.currentUserIndex].lastMessage = action.payload
            const updatedFriends = [...state.friends];
            const updatedChat = [...updatedFriends[state.currentUserIndex].chat, action.payload];
            updatedFriends[state.currentUserIndex] = {
                ...updatedFriends[state.currentUserIndex],
                chat: updatedChat,
                lastMessage: action.payload
            };

            state.friends = updatedFriends;
            state.currentUserIndex = 0
            state.friends.sort((a, b) => {
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
        },
        handleRecieveMessage: (state, action: PayloadAction<ChatMessage>) => {
            let idx;
            if (action.payload.conn_type === 'group') {
                idx = state.friends.findIndex((friend) => friend.socket_id.toString() === action.payload.recieverId.toString())
            } else {
                idx = state.friends.findIndex((friend) => friend.socket_id.toString() === action.payload.senderId.toString())
                state.friends[idx].unreadCount += 1
                state.friends[idx].lastMessage = action.payload
            }

            state.friends[idx].chat.push(action.payload)

            state.friends.sort((a, b) => {
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
        },
        makeUnreadCountZero: (state) => {
            state.friends[state.currentUserIndex].unreadCount = 0
        },
        handleUpdateSeen: (state, action: PayloadAction<ChatMessage>) => {
            const { recieverId, date } = action.payload;
            const friend = state.friends.find(frnd => frnd.socket_id === recieverId);
            if (friend) {
                // Update the seen status of the message in the friend's chat
                friend.chat.forEach((msg: any, index: number) => {
                    if (msg.date === date) {
                        friend.chat[index] = action.payload
                    }
                });
                friend.unreadCount = 0
            }
        },
        handleSetFriends: (state, action) => {
            let isUserOrGrpAlreadyExists;
            if (action.payload.users && action.payload.users.length > 0) {
                isUserOrGrpAlreadyExists = state.friends.some(user => user.socket_id?.toString() === action.payload.socket_id.toString());
            } else {
                isUserOrGrpAlreadyExists = state.friends.some(user => user._id?.toString() === action.payload._id.toString());
            }
            if (!isUserOrGrpAlreadyExists) {
                state.friends.unshift(action.payload)
            }
            state.isLoading = false
        },
        handleSetStatus: (state, action) => {
            const friend = state.friends.find(frnd => frnd.socket_id === action.payload.recieverId);
            if (friend) {
                friend.online_status = action.payload?.status
            }
        },
        updateLastMessage: (state, action) => {
            const friend = state.friends.find(frnd => frnd.socket_id === action.payload.recieverId);
            if (friend) {
                friend.lastMessage = action.payload
            }
        },
        handleSetAllUsersChat: (state, action) => {
            state.friends = action.payload
        },
        handleSetReply: (state, action) => {
            state.replyMessage = action.payload
        },
        handleEditMsg: (state, action) => {
            state.editMessage = action.payload
        },
        updateChatMesssage: (state, action) => {
            const friend = state.friends.find(frnd => frnd.socket_id === action.payload[0].recieverId);
            if (friend) {
                friend.chat = action.payload
            }
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
            window.location.reload();
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
            window.location.reload();
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

export const { handleSendMessage, handleUpdateSeen, handleSetStatus, handleSetAllUsersChat, handleSetReply, handleEditMsg,
    updateLastMessage, handleRecieveMessage, handleSetFriends, toggleCreateGroup, setCurrentLoading, makeUnreadCountZero,
    storeSelectedUsers, handleChatSearchValue, setCurrentGrpOrUser, updateChatMesssage, toggleContactInfo } = msgSlice.actions
export default msgSlice.reducer