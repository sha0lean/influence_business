import { Navigate, Outlet } from "react-router-dom";
import { getRole } from "../localStorage/useRole.js";
const InvestorRoutesProtection = ({ token, children }) => {
    if (!token || !getRole()) {
        return <Navigate to="/connexion" replace />;
    } else if (token && getRole() !== "investor") {
        switch (getRole()) {
            case "entrepreneur":
                return <Navigate to="/profilEntrepreneur" replace />;
                break;
            case "investor":
                return <Navigate to="/profilInvestisseur" replace />;
                break;
            case "admin":
                return <Navigate to="/profilAdmin" replace />;
                break;
            default:
                return <Navigate to="/" replace />;
        }
    }
    return children ? children : <Outlet />;
};

export default InvestorRoutesProtection;
