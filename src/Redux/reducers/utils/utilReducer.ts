import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
    messageValue: string;
    chatArray: any;
    singleChat: any;
    emptyOrChatToggle: boolean;
    activeClass: any;
    showAttachFiles: boolean;
    profileOpen: boolean;
    selectedImage: any;
    toggleSendImages: boolean;
    dummySelectedImage: any[];
    toggleImagesAndMessage: boolean;
};


// const msgArr = ["hii"]
const initialState: InitialState = {
    messageValue: "",
    chatArray: [],
    singleChat: {},
    emptyOrChatToggle: false,
    activeClass: null,
    showAttachFiles: false,
    profileOpen: true,
    selectedImage: [],
    toggleSendImages: false,
    dummySelectedImage: [],
    toggleImagesAndMessage: false,
};
const utilSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        handleSendMessageInput: (state, action) => {
            state.messageValue = action.payload;
        },
        handleEmojiClick: (state, action) => {
            state.messageValue += action.payload.emoji;
        },
        handleChatClick: (state, action) => {
            state.singleChat = action.payload;
            state.activeClass = action.payload?.id;
        },
        handleEmptyOrChatToggle: (state) => {
            state.emptyOrChatToggle = true;
        },
        setShowAttachFiles: (state, action) => {
            state.showAttachFiles = action.payload;
        },
        handleProfileOpen: (state, action) => {
            state.profileOpen = action.payload;
        },
        handleFileChange: (state, action) => {
            state.selectedImage = [...action.payload];
        },
        handleToggleSendImages: (state, action) => {
            state.toggleSendImages = action.payload;
        },
        handleDummySelectImage: (state) => {
            state.dummySelectedImage = state.selectedImage;
        },
        handleToggleImagesAndMessage: (state, action) => {
            state.toggleImagesAndMessage = action.payload;
        },

    },
})

export const {
    handleProfileOpen,
    handleFileChange,
    handleToggleImagesAndMessage,
    handleDummySelectImage,
    handleToggleSendImages,
    handleSendMessageInput,
    setShowAttachFiles,
    handleEmojiClick,
    handleChatClick,
    handleEmptyOrChatToggle,
} = utilSlice.actions;
export default utilSlice.reducer