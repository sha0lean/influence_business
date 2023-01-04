import { Navigate, Outlet } from "react-router-dom";
import {getRole} from "../localStorage/useRole.js";
const ProtectedRoutesEntrepreneur = ({token,children}) => {
    if(!token || !getRole()){
      return <Navigate to="/connexion" replace />;
    }
    else if(token && getRole() !== "entrepreneur"){
      switch(getRole()){
        case "expert":
          return <Navigate to="/profilExpert" replace/>
          break;
        case "investor":
          return <Navigate to="/profilInvestisseur" replace/>
          break;
        default: 
          return <Navigate to="/" replace/>
      }
    }
    return children ? children: <Outlet/>;
  };
  
  export default ProtectedRoutesEntrepreneur;