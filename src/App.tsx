import "./css/App.css"
import 'react-toastify/dist/ReactToastify.css';

// toast and routes.
import { ToastContainer } from "react-toastify"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/store";
// import { PrivateRoutes } from "./components/error/PrivateRoutes";
import { SocketContextProvider } from "./Redux/reducers/socket/SocketContext.tsx"

const App = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <SocketContextProvider user={user}>
      <>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
          pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </>
    </SocketContextProvider>

  )
}

export default App