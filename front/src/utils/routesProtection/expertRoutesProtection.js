import { Navigate, Outlet } from "react-router-dom";
import {getRole} from "../localStorage/useRole.js";
const ProtectedRouteExpert = ({token, children}) => {
    if(!token || !getRole()){
      return <Navigate to="/connexion" replace />;
    }
    else if(token && getRole() !=="expert"){
      switch(getRole()){
        case "admin":
          return <Navigate to="/adminProfil" replace/>
          break;
        case "entrepreneur":
          return <Navigate to="/profilEntrepreneur" replace/>
          break;
        case "investor":
          return <Navigate to="/profilInvestisseur" replace/>
          break;
        default: 
          return <Navigate to="/connexion" replace/>
      }
    }
    return children ? children: <Outlet/>;
  }

  export default ProtectedRouteExpert;