import Home from "../views/Home.js";
import Login from "../views/authentication/LoginPage.js";
import LoginClean from "../views/authentication/LoginPageClean.js";
import Register from "../views/authentication/RegisterPage.js";
import RegisterClean from "../views/authentication/RegisterPageClean.js";
import ForgotPassword from "../views/authentication/ForgotPassword.js";
import ProtectedRoutesAuthentication from "../utils/routesProtection/authenticationRoutesProtection";
import ProtectedRoutesExpert from "../utils/routesProtection/expertRoutesProtection";
import ProtectedRoutesEntrepreneur from "../utils/routesProtection/entrepreneurRoutesProtection";
import ProtectedRoutesInvestor from "../utils/routesProtection/investorRoutesProtection";

import ProfilEntrepreneur from "../views/profiles/ProfilEntrepreneur.js";
import ProfilExpert from "../views/profiles/ProfilExpert.js";
import ProfilInvestor from "../views/profiles/ProfilInvestor.js";

import { setToken, getToken } from "../utils/localStorage/useToken.js";
import { setRole, getRole } from "../utils/localStorage/useRole.js";
import { Navigate } from "react-router-dom";
import Feed from "../views/Feed.js";
import Modules from "../views/Modules.js";

const changeSetRole = (value) => {
    setRole(value);
};

const MainRoutes = {
    path: "",
    children: [
        {
            path: "/",
            element:
                getToken() && getRole() ? (
                    <Navigate to="/profilExpert" />
                ) : (
                    <Home />
                ),
        },
        {
            path: "connexionback",
            element: <ProtectedRoutesAuthentication token={getToken()} />,
            children: [
                {
                    path: "",
                    element: (
                        <Login
                            changeSetRole={changeSetRole}
                            setToken={setToken}
                        />
                    ),
                },
            ],
        },
        {
            path: "connexion",
            element: <ProtectedRoutesAuthentication token={getToken()} />,
            children: [
                {
                    path: "",
                    element: (
                        <LoginClean
                            changeSetRole={changeSetRole}
                            setToken={setToken}
                        />
                    ),
                },
            ],
        },
        {
            path: "inscriptionback",
            element: <ProtectedRoutesAuthentication token={getToken()} />,
            children: [
                {
                    path: "",
                    element: (
                        <Register
                            changeSetRole={changeSetRole}
                            setToken={setToken}
                        />
                    ),
                },
            ],
        },
        {
            path: "inscription",
            element: <ProtectedRoutesAuthentication token={getToken()} />,
            children: [
                {
                    path: "",
                    element: (
                        <RegisterClean
                            changeSetRole={changeSetRole}
                            setToken={setToken}
                        />
                    ),
                },
            ],
        },
        {
            path: "forgot-password",
            element: <ProtectedRoutesAuthentication token={getToken()} />,
            children: [
                {
                    path: "",
                    element: <ForgotPassword />,
                },
            ],
        },
        {
            path: "profilEntrepreneur",
            element: <ProtectedRoutesEntrepreneur token={getToken()} />,
            children: [
                {
                    path: "",
                    element: <ProfilEntrepreneur token={getToken()} />,
                },
                {
                    path: "modules",
                    element: <Modules />,
                },
            ],
        },
        {
            path: "modules/:id",
            element: <ProtectedRoutesEntrepreneur token={getToken()} />,
            children: [
                {
                    path: "",
                    element: <Modules />,
                },
            ],
        },
        {
            path: "profilExpert",
            element: <ProtectedRoutesExpert token={getToken()} />,
            children: [
                {
                    path: "",
                    element: <ProfilExpert />,
                },
            ],
        },
        {
            path: "actualites",
            element: <ProtectedRoutesExpert token={getToken()} />,
            children: [
                {
                    path: "",
                    element: <Feed />,
                },
                {
                    path: "project/:id",
                    element: <ProfilEntrepreneur />,
                },
                {
                    path: "project/:id/modules",
                    element: <Modules />,
                },
            ],
        },
        {
            path: "profilInvestisseur",
            element: <ProtectedRoutesInvestor token={getToken()} />,
            children: [
                {
                    path: "",
                    element: <ProfilInvestor />,
                },
            ],
        },
    ],
};

export default MainRoutes;
