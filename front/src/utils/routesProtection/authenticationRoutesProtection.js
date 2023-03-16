import { Navigate, Outlet } from "react-router-dom";
import { getRole } from "../localStorage/useRole.js";
const ProtectedRoutesAuthentification = ({ token, children }) => {
    if (token && getRole()) {
        switch (getRole()) {
            case "admin":
                return <Navigate to="/profilAdmin" replace />;
                break;
            case "expert":
                return <Navigate to="/profilExpert" replace />;
                break;
            case "investor":
                return <Navigate to="/profilInvestisseur" replace />;
                break;
            case "entrepreneur":
                return <Navigate to="/profilEntrepreneur" replace />;
                break;
            default:
                return <Navigate to="/" replace />;
        }
    }
    return children ? children : <Outlet />;
};

export default ProtectedRoutesAuthentification;
