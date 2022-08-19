import { Navigate, Outlet } from "react-router-dom";
import {getRole} from "../localStorage/useRole.js";

const ProtectedRouteInvestor = ({token, children}) => {
    if(!token || !getRole()){
      return <Navigate to="/connexion" replace />;
    }
    else if(token && getRole() !=="investor"){
      switch(getRole()){
        case "admin":
          return <Navigate to="/adminProfil" replace/>
          break;
        case "entrepreneur":
          return <Navigate to="/profilEntrepreneur" replace/>
          break;
        case "expert":
          return <Navigate to="/profilExpert" replace/>
          break;
        default: 
          return <Navigate to="/" replace/>
      }
    }
    return children ? children: <Outlet/>;
  }

  export default ProtectedRouteInvestor;