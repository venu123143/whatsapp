
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import msgService from "./MsgService";
import { UserState } from "../Auth/AuthReducer";


// const getUserFromLocalStorage = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') as string) : null

export interface AppState {
    screen: boolean;
    users: UserState[];
    groups: IGroup[];
    singleGroup: IGroup | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
    address: boolean;
    userName: string;
    createGrp: boolean;
}
export interface CommonProperties {
    _id?: string | null;
    name?: string;
    about: string;
    profile: string;
    email: string | null;
    mobile?: string | null;
}

export interface IGroup extends CommonProperties {
    room_id: string;
    status: string;
    description: string;
    users: UserState[]
    admins: UserState[]
    maxUsers: number;
    createdBy: UserState
    chat: Array<any>;
}

const initialState: AppState = {
    screen: false,
    users: [],
    groups: [],
    singleGroup: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    address: false,
    createGrp: false,
    userName: "",
};

export const getAllUsers = createAsyncThunk('authSlice/getallUsers', async (_, thunkAPI) => {
    try {
        const res = await msgService.allUsers()
        return res

    } catch (error: any) {
        // console.log("error ", error);
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
// export const VerifyOtp = createAsyncThunk('authSlice/Verifyotp', async (data: { mobile: string, otp: string[] }, thunkAPI) => {
//     try {
//         const res = await userService.verifyOtp(data.mobile, data.otp)
//         return res

//     } catch (error: any) {
//         localStorage.removeItem("token")
//         return thunkAPI.rejectWithValue(error?.response?.data)
//     }
// })


const msgSlice = createSlice({
    name: 'msgSlice',
    initialState,
    reducers: {
        toggleCreateGroup: (state, action) => {
            state.createGrp = action.payload
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
            state.groups = action.payload.groups
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
        // builder.addCase(VerifyOtp.pending, (state) => {
        //     state.isLoading = true
        // }).addCase(VerifyOtp.fulfilled, (state, action: PayloadAction<any>) => {
        //     state.isLoading = false
        //     state.isSuccess = true
        //     state.message = action.payload?.message
        //     state.user = action.payload.user
        //     toast.success(state.message, {
        //         position: 'top-left'
        //     })
        // }).addCase(VerifyOtp.rejected, (state, action: PayloadAction<any>) => {
        //     state.isLoading = false
        //     state.isError = true
        //     state.isSuccess = false
        //     state.user = null
        //     state.message = action.payload?.message
        //     toast.error(state.message, {
        //         position: 'top-left'
        //     })
        // })
    }

})

export const { toggleCreateGroup } = msgSlice.actions
export default msgSlice.reducer