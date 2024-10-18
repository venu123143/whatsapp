
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import msgService from "./MsgService";
import { UserState } from "../Auth/AuthReducer";
// import { dummyMessages } from "../../../static/Static"
type connType = "onetoone" | "group";
interface ReplyFor {
    id: string
    name: string | null;
    message: string
}

export interface ChatUser {
    _id: string;
    name?: string
    display_name: string
    phoneNumber: string
}
export interface IMessage {
    _id?: string;
    room_id: string;
    message: string;
    date: string;
    msgType: "text" | "audio" | "file" | "image";
    conn_type: connType;
    seen: boolean;
    send: boolean;
    isMyMsg: boolean;
    sender: {
        id: string;
        name?: string;
        mobile: string;
        profile?: string;
    };
    replyFor: ReplyFor | null;
    file?: string | null;
}

// const getUserFromLocalStorage = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') as string) : null
export interface ConnectionResult {
    _id: string;
    room_id: string;
    conn_type: string;
    messages: IMessage[];
    lastMessage: IMessage;
    display_name: string;
    profile: string;
    about: string | null;
    admins: string[];
    users: ChatUser[];
    online_status: boolean;
    unreadCount: number;
}


export interface AppState {
    currentUserIndex: any;
    isCurrentLoading: boolean;
    chatSearchValue: string;
    screen: boolean;
    users: CommonProperties[];
    groups: IGroup[];
    friends: ConnectionResult[];
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
    _id?: string
    room_id?: string;
    message: string;
    date: string;
    right: boolean;
    msgType: string;
    senderId: string
    conn_type: string;
    seen: boolean;
    file?: any
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
        handleSendMessage: (state, action: PayloadAction<IMessage>) => {
            const friend = state.friends.find(frnd => frnd.room_id === action.payload.room_id);

            if (friend) {
                const msgIdx = friend.messages.findIndex((msg: any) => new Date(msg.date).getTime() === new Date(action.payload.date).getTime());
                if (msgIdx !== -1) {
                    // Update the specific message within the `messages` array
                    friend.messages[msgIdx] = action.payload;
                    friend.lastMessage = action.payload;
                } else {
                    friend.messages.push(action.payload);
                    friend.lastMessage = action.payload;
                }
            }
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
            state.currentUserIndex = 0
        },
        handleRecieveMessage: (state, action: PayloadAction<IMessage>) => {
            const friend = state.friends.filter((friend) => friend.room_id === action.payload.room_id)[0]
            const remainingChat = state.friends.filter((friend: any) => friend.room_id !== action.payload.room_id);
            const friendIdx = state.friends.findIndex(frnd => frnd.room_id === action.payload.room_id);

            friend.messages = [...friend.messages, action.payload];
            friend.lastMessage = action.payload;
            if (state.friends[state.currentUserIndex] !== friend) {
                friend.unreadCount += 1;
            }
            const updatedFriends = [friend, ...remainingChat];
            state.friends = updatedFriends
            // Sort friends by the most recent last message date
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

            if (state.currentUserIndex === 0 && friendIdx !== 0) {
                state.currentUserIndex = state.currentUserIndex + 1
            }
        },

        makeUnreadCountZero: (state) => {
            state.friends[state.currentUserIndex].unreadCount = 0
        },
        handleUpdateSeen: (state, action: PayloadAction<ChatMessage>) => {
            console.log(state, action);

            // const { recieverId, date } = action.payload;
            // const friend = state.friends.find(frnd => frnd.socket_id === recieverId);
            // if (friend) {
            //     // Update the seen status of the message in the friend's chat
            //     friend.chat.forEach((msg: any, index: number) => {
            //         if (msg.date === date) {
            //             friend.chat[index] = action.payload
            //         }
            //     });
            //     friend.unreadCount = 0
            // }
        },
        handleSetFriends: (state, action) => {
            console.log(state, action);

            // let isUserOrGrpAlreadyExists;
            // if (action.payload.users && action.payload.users.length > 0) {
            //     isUserOrGrpAlreadyExists = state.friends.some(user => user.socket_id?.toString() === action.payload.socket_id.toString());
            // } else {
            //     isUserOrGrpAlreadyExists = state.friends.some(user => user._id?.toString() === action.payload._id.toString());
            // }
            // if (!isUserOrGrpAlreadyExists) {
            //     state.friends.unshift(action.payload)
            // }
            // state.isLoading = false
        },
        handleSetStatus: (state, action) => {
            const friend = state.friends.find(frnd => frnd.room_id === action.payload.room_id);
            if (friend) {
                friend.online_status = action.payload?.online_status
            }
            // const friend = state.friends.find(frnd => frnd.socket_id === action.payload.recieverId);
            // if (friend) {
            // }
        },
        updateLastMessage: (state, action: PayloadAction<ChatMessage>) => {
            const friend = state.friends.find(frnd => frnd.room_id === action.payload.room_id);
            if (friend) {
                //     friend.lastMessage = action.payload
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
        updateChatMessage: (state, action: PayloadAction<IMessage>) => {
            const friend = state.friends.find(frnd => frnd.room_id === action.payload.room_id);
            if (friend) {
                const msgIdx = friend.messages.findIndex(msg => msg._id === action.payload?._id);
                if (msgIdx !== -1) {
                    // Update the specific message within the `messages` array
                    friend.messages[msgIdx] = action.payload;
                }
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
            // window.location.reload();
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
            // window.location.reload();
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
    storeSelectedUsers, handleChatSearchValue, setCurrentGrpOrUser, updateChatMessage, toggleContactInfo } = msgSlice.actions
export default msgSlice.reducer