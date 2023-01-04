import Home from "../views/Home.js"
import LoginPage from "../views/authentication/LoginPage.js"
import RegisterPage from "../views/authentication/RegisterPage.js";
import ForgotPassword from "../views/authentication/ForgotPassword.js";
import ProtectedRoutesAuthentication from "../utils/routesProtection/authenticationRoutesProtection";
import ProtectedRoutesExpert from "../utils/routesProtection/expertRoutesProtection";
import ProtectedRoutesEntrepreneur from "../utils/routesProtection/entrepreneurRoutesProtection";
import ProtectedRoutesInvestor from "../utils/routesProtection/investorRoutesProtection";

import ProfilEntrepreneur from "../views/profil/ProfilEntrepreneur.js";
import ProfilExpert from "../views/profil/ProfilExpert.js";
import ProfilInvestor from "../views/profil/ProfilInvestor.js";


import {setToken, getToken,removeToken} from "../utils/localStorage/useToken.js";
import {setRole,getRole,removeRole} from "../utils/localStorage/useRole.js";

let token = getToken();
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
            element: <ProtectedRoutesAuthentication token={getToken()}/>,
            children: [
                {
                    path: "",
                    element: <LoginPage changeSetRole={changeSetRole} setToken={setToken}/>
                }
            ]
        },
        {
            path: "inscription",
            element: <ProtectedRoutesAuthentication token={getToken()}/>,
            children: [
                {
                    path: "",
                    element: <RegisterPage changeSetRole={changeSetRole} setToken={setToken}/>
                }
            ]
        },
        {
            path: "forgot-password",
            element: <ProtectedRoutesAuthentication token={getToken()}/>,
            children: [
                {
                    path: "",
                    element: <ForgotPassword/>
                }
            ]
        },
        {
            path: "profilEntrepreneur",
            element: <ProtectedRoutesEntrepreneur token={getToken()}/>,
            children: [
                {
                    path: "",
                    element: <ProfilEntrepreneur/>
                }
            ]
        },
        {
            path: "profilExpert",
            element: <ProtectedRoutesExpert token={getToken()}/>,
            children: [
                {
                    path: "",
                    element: <ProfilExpert/>
                }
            ]
        },
        {
            path: "profilInvestisseur",
            element: <ProtectedRoutesInvestor token={getToken()}/>,
            children: [
                {
                    path: "",
                    element: <ProfilExpert/>
                }
            ]
        }
    ]
}

export default MainRoutes;