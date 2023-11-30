import { Navigate } from "react-router-dom";

export const PrivateRoute = (( children, redirectTo = "/" ) => {
    const isAuthenticaded = localStorage.getItem("token") !== null;

    return isAuthenticaded ? children : <Navigate to={redirectTo} />
});