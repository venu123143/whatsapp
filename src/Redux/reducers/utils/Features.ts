import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllData } from "./utilService";
import { users } from "../../../static/Static";

interface ActiveChat {
  name: string;
  id: string;
  status?: string;
  profile?: string;
}
interface InitialState {
  contacts: boolean;
  editmsg: boolean;
  users: Array<any>;
  activeChat: ActiveChat;
}
const initialState: InitialState = {
  contacts: false,
  editmsg: false,
  users: users,
  activeChat: {
    name: "",
    id: "",
    status: "",
    profile: "",
  },
};
export const getAllUsers = createAsyncThunk("features/getAllUsers", async (_, thunkAPI) => {
  try {

    const res = await getAllData();

    return res;
  } catch (error: any) {

    return thunkAPI.rejectWithValue(error);
  }
})

// PayloadAction
export const FeatureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    toggleContacts: (state, action: PayloadAction<boolean>) => {
      state.contacts = action.payload;
    },
    toggleEditMessage: (state, action) => {
      state.editmsg = action.payload;
    },
    handleActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { toggleContacts, toggleEditMessage, handleActiveChat } =
  FeatureSlice.actions;

export default FeatureSlice.reducer;
