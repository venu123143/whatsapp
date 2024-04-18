import "./css/App.css"
import 'react-toastify/dist/ReactToastify.css';

// toast and routes.
import { ToastContainer } from "react-toastify"
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";


const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
        pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calls" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    </>
  )
}

export default App