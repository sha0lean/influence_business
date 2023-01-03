import Home from "../views/Home.js"
import LoginPage from "../views/authentication/LoginPage.js"
import RegisterPage from "../views/authentication/RegisterPage.js";
import ForgotPassword from "../views/authentication/ForgotPassword.js";
import ProtectedRouteAuthentication from "../utils/routesProtection/authenticationRoutesProtection";
import {setToken, getToken,removeToken} from "../utils/localStorage/useToken.js";
import {setRole,getRole,removeRole} from "../utils/localStorage/useRole.js";

let token = getToken();
console.log(token);
const changeSetRole = (value) => {
  setRole(value);
}

const MainRoutes = {
    path: "",
    children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "connexion",
            element: <ProtectedRouteAuthentication token={getToken()}/>,
            children: [
                {
                    path: "",
                    element: <LoginPage changeSetRole={changeSetRole} setToken={setToken}/>
                }
            ]
        },
        {
            path: "inscription",
            element: <ProtectedRouteAuthentication token={getToken()}/>,
            children: [
                {
                    path: "",
                    element: <RegisterPage changeSetRole={changeSetRole} setToken={setToken}/>
                }
            ]
        },
        {
            path: "forgot-password",
            element: <ProtectedRouteAuthentication token={getToken()}/>,
            children: [
                {
                    path: "",
                    element: <ForgotPassword/>
                }
            ]
        }
    ]
}

export default MainRoutes;