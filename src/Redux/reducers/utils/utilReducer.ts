import { PayloadAction, createSlice } from "@reduxjs/toolkit"
type InitialState = {
    chatSearchValue: string;
    messageValue: string;
    messageArray: any;
    chatArray: any;
    singleChat: any;
    emptyOrChatToggle: boolean;
    activeClass: any;
    showAttachFiles: boolean;
    profileOpen: boolean;
    nameEditClick: boolean;
    aboutEditClick: boolean;
    name: string;
    about: string;
    selectedImage: any;
    toggleSendImages: boolean;
    dummySelectedImage: any[];
    toggleImagesAndMessage: boolean;
};


// const msgArr = ["hii"]
const initialState: InitialState = {
    chatSearchValue: "",
    messageValue: "",
    messageArray: [],
    chatArray: [],
    singleChat: {},
    emptyOrChatToggle: false,
    activeClass: null,
    showAttachFiles: false,
    profileOpen: true,
    nameEditClick: false,
    aboutEditClick: false,
    name: "",
    about: "",
    selectedImage: [],
    toggleSendImages: false,
    dummySelectedImage: [],
    toggleImagesAndMessage: false,
};
const utilSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        handleChatSearchValue: (state, action: PayloadAction<string>) => {
            state.chatSearchValue = action.payload;
        },
        handleSendMessageInput: (state, action) => {
            state.messageValue = action.payload;
        },
        handleEmojiClick: (state, action) => {
            state.messageValue += action.payload.emoji;
        },
        handleSendMessage: (state, action) => {
            console.log(action.payload)
            state.messageArray.push(action.payload);
            state.messageValue = "";
            console.log(state.messageArray);
            
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
        handleNameEditClick: (state, action) => {
            state.nameEditClick = action.payload;
        },
        handleAboutEditClick: (state, action) => {
            state.aboutEditClick = action.payload;
        },
        handleNameChange: (state, action) => {
            state.name = action.payload;
        },
        handleAboutChange: (state, action) => {
            state.about = action.payload;
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
    handleChatSearchValue,
    handleProfileOpen,
    handleFileChange,
    handleToggleImagesAndMessage,
    handleDummySelectImage,
    handleToggleSendImages,
    handleSendMessageInput,
    handleNameChange,
    handleAboutChange,
    handleNameEditClick,
    handleAboutEditClick,
    setShowAttachFiles,
    handleEmojiClick,
    handleSendMessage,
    handleChatClick,
    handleEmptyOrChatToggle,
} = utilSlice.actions;
export default utilSlice.reducer