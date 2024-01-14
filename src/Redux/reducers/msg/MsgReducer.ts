
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import msgService from "./MsgService";
import { UserState } from "../Auth/AuthReducer";


// const getUserFromLocalStorage = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') as string) : null



export const allUsers = createAsyncThunk('authSlice/allUsers', async (_, thunkAPI) => {
    try {
        const res = await msgService.allUsers()
        return res

    } catch (error: any) {
        // console.log("error ", error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const allGroups = createAsyncThunk('authSlice/allGroups', async (_, thunkAPI) => {
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

export interface AppState {
    screen: boolean;
    users: UserState[] | null;
    groups: IGroup[] | null;
    singleGroup: IGroup | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
    address: boolean;
    userName: string;
}

export interface IGroup {
    group_name: string;
    room_id: string;
    status: string;
    description: string;
    users: UserState[]
    admins: UserState[]
    maxUsers: number;
    profile: string;
    createdBy: UserState
    chat: Array<any>;
}

const initialState: AppState = {
    screen: false,
    users: null,
    groups: [],
    singleGroup: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    address: false,
    userName: "",
};
const msgSlice = createSlice({
    name: 'msgSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(allUsers.pending, (state) => {
            state.isLoading = true
        }).addCase(allUsers.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.users = action.payload
            toast.success("user registered sucessfully", {
                position: 'top-right'
            })
        }).addCase(allUsers.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(allGroups.pending, (state) => {
            state.isLoading = true
        }).addCase(allGroups.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.groups = action.payload.groups
            state.message = action.payload?.message
            toast.success(state.message, {
                position: 'top-right'
            })
        }).addCase(allGroups.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.groups = null
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

export const { } = msgSlice.actions
export default msgSlice.reducer