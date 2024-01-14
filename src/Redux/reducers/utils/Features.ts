import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllData } from "./utilService";
import { users } from "../../../static/Static";
import io from "socket.io-client"

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
  socket: any;
  createContact: boolean;
  userName: string;
  about: string;
  nameEditClick: boolean;
  aboutEditClick: boolean;
}
const socket = io("http://localhost:8000")

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
  socket: socket,
  createContact: false,
  userName: "",
  about: "",
  nameEditClick: false,
  aboutEditClick: false,
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
    toggleCreateContact: (state, action: PayloadAction<boolean>) => {
      state.createContact = action.payload;
    },
    handleNameEditClick: (state, action) => {
      state.nameEditClick = action.payload.nameEditClick;
      state.userName = action.payload.name
    },
    handleAboutEditClick: (state, action) => {
      state.aboutEditClick = action.payload?.aboutEditClick;
      state.about = action.payload?.about
    },
    handleNameChange: (state, action) => {
      state.userName = action.payload;
    },
    handleAboutChange: (state, action) => {
      state.about = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { toggleContacts, toggleEditMessage, handleActiveChat, toggleCreateContact, handleNameChange,
  handleAboutChange,
  handleNameEditClick,
  handleAboutEditClick, } =
  FeatureSlice.actions;

export default FeatureSlice.reducer;
