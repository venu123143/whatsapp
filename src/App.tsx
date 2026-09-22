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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Redux/store";
import createSocket from "./Redux/reducers/utils/socket/SocketConnection";
import { loadSession, sessionExpired } from "./Redux/reducers/Auth/AuthReducer";
import { SESSION_EXPIRED_EVENT } from "./Redux/reducers/utils/axiosClient";
import { PrivateRoutes } from "./components/error/PrivateRoutes";
import Status from "./pages/Status";

export const CallsContext = createContext<Socket>({} as Socket);
export const SocketContext = createContext<Socket>({} as Socket);

const EMPTY_SOCKET = {} as Socket;

const App = () => {
  const dispatch: AppDispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const [callSocket, setCallSocket] = useState<Socket>(EMPTY_SOCKET)
  const [socket, setSocket] = useState<Socket>(EMPTY_SOCKET)

  // ask the server who we are; the interceptor refreshes the access token if needed.
  useEffect(() => {
    dispatch(loadSession())
  }, [dispatch])

  // the interceptor could not refresh -> the 45 day window is over, drop the session.
  useEffect(() => {
    const handleExpired = () => dispatch(sessionExpired())
    window.addEventListener(SESSION_EXPIRED_EVENT, handleExpired)
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleExpired)
  }, [dispatch])

  useEffect(() => {
    if (!user?._id) {
      // logged out: the cleanup of the previous run already closed the sockets.
      setSocket(EMPTY_SOCKET)
      setCallSocket(EMPTY_SOCKET)
      return
    }

    let cancelled = false
    const opened: Socket[] = []

    const initializeSockets = async () => {
      try {
        const chatSocket = await createSocket(import.meta.env.VITE_API_SOCKET_URL as string);
        opened.push(chatSocket)
        if (cancelled) return
        setSocket(chatSocket)

        const callsSocket = await createSocket(import.meta.env.VITE_API_CALLS_URL as string);
        opened.push(callsSocket)
        if (cancelled) return
        setCallSocket(callsSocket)
      } catch (error) {
        // createSocket already refreshed once and gave up; the rejection is handled here
        // so it never surfaces as an unhandled promise rejection.
        console.error("Unable to establish the socket connection:", error)
      }
    };

    initializeSockets();

    // one connection per login, no duplicates on re-render or fast logout/login.
    return () => {
      cancelled = true
      opened.forEach((each) => each.close())
    }
  }, [user?._id]);

  return (
    <>
      <SocketContext.Provider value={socket} >
        <CallsContext.Provider value={callSocket} >
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
            pauseOnFocusLoss draggable pauseOnHover theme="light" />
          <Routes>
            <Route path="/" element={<PrivateRoutes><Home /></PrivateRoutes>} />
            <Route path="/login" element={<Login />} />
            <Route path="/calls" element={<PrivateRoutes><VideoHome /></PrivateRoutes>} />
            <Route path="/status" element={<PrivateRoutes><Status /></PrivateRoutes>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CallsContext.Provider>
      </SocketContext.Provider >
    </>
  )
}

export default App
