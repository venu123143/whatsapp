import { ReactNode } from 'react';
import { Navigate } from "react-router-dom"

export const PrivateRoutes = ({ children }: { children: ReactNode }) => {
    const getToken = JSON.parse(localStorage.getItem("token") as string)
    return getToken?.refreshToken !== undefined ? children : (<Navigate to= '/login' replace = { true} />)
}