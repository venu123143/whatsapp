# [WhatsApp Clone with React, Node and Socket.IO](https://vchat.nerchuko.in/)

This project is a WhatsApp-like messaging application built with a modern tech stack, including React, Vite, and TypeScript. It provides a wide range of features such as real-time communication, group chats, user authentication with OTP, and message management functionalities.

You can check the hosted version of this project here:  [https://vchat.nerchuko.in/](https://vchat.nerchuko.in/).

## 🔗 Repositories & Branch Info

- **Frontend Code**  
  Branch: `with_mongodb`  
  Repository: [https://github.com/venu123143/whatsapp_clone](https://github.com/venu123143/whatsapp_clone)

- **Backend Code**  
  Branch: `with_mongodb`  
  Repository: [https://github.com/venu123143/whatsapp_backend](https://github.com/venu123143/whatsapp_backend)


## Key Features


- **Authentication**: User login with OTP for secure access.
- **Chat Functionalities**: Group chats, individual chats, media sharing (photos, voice recordings), message replies, editing, and deletion.
- **User Profiles**: Customizable profile pictures, names, and bios. including the take phtoto and upload feature.
- **Video Call**: One to One and Group video call feature is implemented using webrtc.
- **Real-time Communication**: Enabled by Socket.io.
- **State Management**: Managed with Redux and Redux Toolkit.
- **Validation and Forms**: Utilizes Formik and Yup for form handling and validation.
- **UX/UI Components**: React Router for navigation, React Select for dropdowns, React Toastify for notifications, and React Spinners for loading indicators.
- **Design and Styling**: Tailwind CSS for styling and React Icons for icons.
- **Responsive**: This website is fully responsive for the all types of devices.

## Technology Stack

- **Frontend**: React + Vite, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, JWT Tokens
- **Database**: MongoDB
- **Real-time Communication**: Socket.io
- **Video Call**: WebRTc
- **State Management**: Redux with Redux Toolkit

## Libraries and Dependencies

The following libraries and dependencies are used in this project:

- **Frontend Dependencies**:
  - `react`, `react-dom`, `react-router-dom`
  - `@reduxjs/toolkit`, `react-redux`
  - `formik`, `yup`, `axios`
  - `emoji-picker-react`, `react-dropzone`, `wavesurfer.js`
  - `react-select`, `react-toastify`, `react-icons`, `react-spinners`
  - `socket.io-client`

- **Frontend Dev Dependencies**:
  - `@vitejs/plugin-react-swc`
  - `typescript`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`
  - `eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
  - `postcss`, `autoprefixer`, `tailwindcss`



## Project Screenshots

### 1. Login Page

![Login Page](https://res.cloudinary.com/dsnq9xdwt/image/upload/v1715265169/Screenshot_219_p6sofo.png)

Description: This is the login page where users can authenticate using an OTP. The UI is designed for a simple and secure login experience.

### 2. Home Page

![Home Page](https://res.cloudinary.com/dsnq9xdwt/image/upload/v1715265169/Screenshot_221_i2frib.png)

Description: The home page shows the list of active chats and groups. Users can start new conversations, join groups, or continue existing chats.

### 3. Profile Page

![Profile Page](https://res.cloudinary.com/dsnq9xdwt/image/upload/v1715265169/Screenshot_220_lzcs5r.png)

Description: This is the profile page where users can customize their profile picture, name, and bio. They can also manage personal settings and account information.

![Home page Gif](https://res.cloudinary.com/dsnq9xdwt/image/upload/v1715265914/Whatsapp-GoogleChrome2024-05-0920-07-28-ezgif.com-video-to-gif-converter_wlzlm5.gif)


## Setup and Development

## Environment Variables

To run this project locally, you need to set some environment variables. Create a `.env` file in the root directory of your frontend and add the following variables:

```bash
VITE_API_CLIENT_URL=http://localhost:5000/api
VITE_API_SOCKET_URL=http://localhost:5000
VITE_API_CALLS_URL=http://localhost:5000/calls
