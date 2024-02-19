
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import userService from "./AuthService";
import { toast } from "react-toastify";
import { CommonProperties } from "../msg/MsgReducer";



const getUserFromLocalStorage = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') as string) : null

export interface UserState extends CommonProperties {
    password?: string | null;
    refreshToken?: string | null;
    role?: string | null;
    isBlocked?: string | null;
    otp?: any;
}

export const upateUser = createAsyncThunk('authSlice/upateUser', async (data: { id: string, value: { name?: string, about?: string, profile?: string } }, thunkAPI) => {
    try {
        const res = await userService.upateUser(data.id, data.value)
        return res

    } catch (error: any) {
        localStorage.removeItem("token")
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const uploadProfile = createAsyncThunk('authSlice/uploadProfile', async (data: any, thunkAPI) => {
    try {
        const res = await userService.uploadProfilePicture(data.images, data._id)
        return res
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const logout = createAsyncThunk('authSlice/logoutUser', async (_, thunkAPI) => {
    try {
        const res = await userService.logout()
        return res

    } catch (error: any) {
        localStorage.removeItem("token")
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

export const sendOtp = createAsyncThunk('authSlice/sendOtp', async (mobile: string, thunkAPI) => {
    try {
        const res = await userService.sendotp(mobile)
        return res
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const VerifyOtp = createAsyncThunk('authSlice/Verifyotp', async (data: { mobile: string, otp: string[] }, thunkAPI) => {
    try {
        const res = await userService.verifyOtp(data.mobile, data.otp)
        return res

    } catch (error: any) {
        localStorage.removeItem("token")
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

interface AppState {
    screen: boolean,
    user: UserState | null;
    isError: boolean;
    isLoading: boolean;
    isProfileLoading: boolean;
    isSuccess: boolean;
    message: string;
    address: boolean;
    userName: string;
}
const initialState: AppState = {
    screen: false,
    user: getUserFromLocalStorage,
    isError: false,
    isLoading: false,
    isProfileLoading: false,
    isSuccess: false,
    message: "",
    address: false,
    userName: "",
};
const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        handleUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logout.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        }).addCase(logout.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = null
            state.message = action.payload?.message
            toast.success(state.message, {
                position: 'top-right'
            })
        }).addCase(logout.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isLoading = false
            state.user = null
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(sendOtp.pending, (state) => {
            state.isLoading = true
        }).addCase(sendOtp.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload?.message
            toast.success(state.message, {
                position: 'top-left'
            })
        }).addCase(sendOtp.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-left'
            })
        })
        builder.addCase(VerifyOtp.pending, (state) => {
            state.isLoading = true
        }).addCase(VerifyOtp.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload?.message
            state.user = action.payload.user
            toast.success(state.message, {
                position: 'top-left'
            })
        }).addCase(VerifyOtp.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.user = null
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-left'
            })
        })
        builder.addCase(upateUser.pending, (state) => {
            state.isLoading = true
        }).addCase(upateUser.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            toast.success("name/ about is updated sucessfully", {
                position: 'top-left'
            })
        }).addCase(upateUser.rejected, (state) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error("Unable to update the user", {
                position: 'top-left'
            })
        })
        builder.addCase(uploadProfile.pending, (state) => {
            state.isProfileLoading = true
        }).addCase(uploadProfile.fulfilled, (state, action: PayloadAction<any>) => {
            state.isProfileLoading = false
            state.isSuccess = true
            state.user = action.payload
            toast.success("User profile picture is updated sucessfully", {
                position: 'top-left'
            })
        }).addCase(uploadProfile.rejected, (state) => {
            state.isProfileLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error("Unable to upload the DP", {
                position: 'top-left'
            })
        })
    }

})

export const { handleUser } = authSlice.actions
export default authSlice.reducer