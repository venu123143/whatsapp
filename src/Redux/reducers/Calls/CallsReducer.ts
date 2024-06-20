
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import callsService from "./CallsService";
import { toast } from "react-toastify";



// const getUserFromLocalStorage = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') as string) : null
interface User {
    _id: string;
    mobile: string;
    socket_id: string;
    name: string;
    profile: string;
}

export interface ICall {
    title?: string;
    _id: string;
    socketId: string;
    status: string;
    createdBy: User;
    joinedUsers: User[];
    pin?: string;
    callType: string;
    callDuration: number;
    createdAt: string;
    updatedAt: string;
}


export const updateCall = createAsyncThunk('callsSlice/updateCall', async (data: { id: string, value: { status?: string, userId?: string, callDuration: number } }, thunkAPI) => {
    try {
        const res = await callsService.updateCall(data.id, data.value)
        return res
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const getAllCallsHistory = createAsyncThunk('callsSlice/getAllCallsHistory', async (_, thunkAPI) => {
    try {
        const res = await callsService.getCallsHistory()
        return res
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const getAllLiveCalls = createAsyncThunk('callsSlice/getAllLiveCalls', async (_, thunkAPI) => {
    try {
        const res = await callsService.getLiveCalls()
        return res
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

export const startCall = createAsyncThunk('callsSlice/startCall', async (data: any, thunkAPI) => {
    try {
        const res = await callsService.createCall(data?.title, data?.callType, data?.pin)
        return res
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})


interface AppState {
    liveCalls: Array<ICall>,
    recentCalls: Array<ICall>,
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
    activePin: boolean;
    errors: any;
    callStarted: boolean;
    isCalling: boolean;

}
const initialState: AppState = {
    callStarted: false,
    isCalling: false,
    liveCalls: [],
    recentCalls: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    activePin: false,
    errors: {}
};
const callsSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setActivePin: (state, action) => {
            state.activePin = action.payload
        },
        setErrors: (state, action) => {
            state.errors = action.payload
        },
        setCallStart: (state, action) => {
            state.callStarted = action.payload
        },
        setIsCalling: (state, action) => {
            state.isCalling = action.payload
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(startCall.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        }).addCase(startCall.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload?.message
            toast.success(state.message, {
                position: 'top-right'
            })
        }).addCase(startCall.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(getAllLiveCalls.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllLiveCalls.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload?.message
            state.liveCalls = action.payload.data
            toast.success(state.message, {
                position: 'top-left'
            })
        }).addCase(getAllLiveCalls.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-left'
            })
        })
        builder.addCase(getAllCallsHistory.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllCallsHistory.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload?.message
            state.recentCalls = action.payload?.data
            toast.success(state.message, {
                position: 'top-left'
            })
        }).addCase(getAllCallsHistory.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-left'
            })
        })
        builder.addCase(updateCall.pending, (state) => {
            state.isLoading = true
        }).addCase(updateCall.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload?.message
            toast.success(state.message, {
                position: 'top-left'
            })
        }).addCase(updateCall.rejected, (state, action: PayloadAction<any>) => {
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

export const { setIsLoading, setIsCalling, setActivePin, setErrors, setCallStart } = callsSlice.actions
export default callsSlice.reducer