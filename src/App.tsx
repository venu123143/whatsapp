import "./css/App.css"
import 'react-toastify/dist/ReactToastify.css';

// toast and routes.
import { ToastContainer } from "react-toastify"
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import VideoHome from "./components/video/VideoHome";
import { createContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/store";
import createSocket from "./Redux/reducers/utils/socket/SocketConnection";

export const CallsContext = createContext<Socket>({} as Socket);

const App = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [socket, setSocket] = useState({} as Socket)
  useEffect(() => {
    const initializeSocket = async () => {
      if (user !== null && !socket.connected) {
        const socket = await createSocket(user, import.meta.env.VITE_API_CALLS_URL as string);
        setSocket(socket)
      }
    };
    initializeSocket();
  }, [user]);
  return (
    <>
      <CallsContext.Provider value={socket} >
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
          pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calls" element={<VideoHome />} />
          <Route path="*" element={<Navigate to="/" />} />
          {/* <Route path="/video" element={<VideoCall localStream={sujiBday} remoteStream={Priests} />} /> */}
        </Routes>
      </CallsContext.Provider>

    </>
  )
}

export default App