import { AuthConext } from "@/context/AuthContext";
import { useContext } from "react";
import {  useLocation, Navigate } from "react-router-dom";

const PrivateRoutes = ({loader, children}) => {
    const { authInfo, isLoading } = useContext(AuthConext);

    if (isLoading) {
        return loader || <div>Loading...</div>;
    }

    if (authInfo) {
        return children;
    }

    return <Navigate to={`/auth/login`} />
}

export default PrivateRoutes