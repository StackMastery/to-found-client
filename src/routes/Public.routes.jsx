import { AuthConext } from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ loader, children }) => {
    const { authInfo, isLoading } = useContext(AuthConext);

    if (isLoading) {
        return loader || <div>Loading...</div>;
    }

    if (!authInfo) {
        return children;
    }

    return <Navigate to="/"/>;
};

export default PublicRoutes;
