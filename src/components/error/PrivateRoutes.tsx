import { Navigate } from "react-router-dom"
import { ReactNode } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

/** Guards a route with the redux session, not with a token read out of localStorage. */
export const PrivateRoutes = ({ children }: { children: ReactNode }) => {
    const { user, bootstrapped } = useSelector((state: RootState) => state.auth)

    // wait for /me before deciding, otherwise a valid session flashes the login page.
    if (!bootstrapped && user === null) return null;

    return user !== null ? <>{children}</> : <Navigate to='/login' replace={true} />
}

export default PrivateRoutes
