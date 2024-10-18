import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllData } from "./utilService";
// import io from "socket.io-client"

interface ActiveChat {
  name: string;
  id: string;
  status?: string;
  profile?: string;
}
interface InitialState {
  contacts: boolean;
  editmsg: boolean;
  deleteMsg: boolean;
  activeChat: ActiveChat;
  // socket: any;
  createContact: boolean;
  userName: string;
  about: string;
  nameEditClick: boolean;
  aboutEditClick: boolean;
  isFullscreen: boolean;
  currentImage: any;
  zoomLevel: number;
  isRecord: boolean;
  images: any[];
  currentIndex: number | null;
}

const initialState: InitialState = {
  contacts: false,
  editmsg: false,
  deleteMsg: false,
  activeChat: {
    name: "",
    id: "",
    status: "",
    profile: "",
  },
  // socket: socket,
  createContact: false,
  userName: "",
  about: "",
  nameEditClick: false,
  aboutEditClick: false,
  currentImage: null,
  isFullscreen: false,
  currentIndex: null,
  zoomLevel: 1,
  isRecord: false,
  images: []
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
    toggleDeleteMessage: (state, action) => {
      state.deleteMsg = action.payload;
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
    setIsFullscreen: (state, action) => {
      state.isFullscreen = action.payload;
    },
    setCurrentImage: (state, action) => {
      state.currentImage = action.payload;
    },
    setZoomLevel: (state, action) => {
      state.zoomLevel = action.payload;
    },
    openfullScreen: (state, action) => {
      state.currentImage = action.payload.currentImage;
      state.isFullscreen = action.payload.isFullscreen;
      state.zoomLevel = action.payload.zoomLevel;
      state.currentIndex = action.payload.currentIndex;
      state.images = action.payload.images
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload
    },
    toggleisRecord: (state, action) => {
      state.isRecord = action.payload
    }
  },
});

export const {
  toggleContacts,
  toggleEditMessage,
  handleActiveChat,
  toggleCreateContact,
  handleNameChange,
  handleAboutChange,
  handleNameEditClick,
  handleAboutEditClick,
  setIsFullscreen,
  setCurrentImage,
  openfullScreen,
  setZoomLevel,
  setCurrentIndex,
  toggleisRecord,
  toggleDeleteMessage
} = FeatureSlice.actions;

export default FeatureSlice.reducer;
