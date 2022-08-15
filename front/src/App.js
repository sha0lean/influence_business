// import React, { useState } from "react"
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom"

// project imports
// import MainLayout from 'layout/MainLayout.js';

// routes auth
import LoginPage from "./views/login/LoginPage.js"
import RegisterPage from "./views/login/RegisterPage.js"

// routes root
import Home from "./views/Home.js"
import Feed from "./views/Feed.js"
import Missing from "./views/utilities/Missing.js"

// routes profiles
import AdminProfil from "./views/profiles/AdminProfil.js"
import EntrepreneurProfil from "./views/profiles/EntrepreneurProfil.js"
import ExpertProfile from "./views/profiles/ExpertProfil.js"
import InvestorProfile from "./views/profiles/InvestorProfil.js"

// routes projects
import CreateProject from "./views/projects/CreateProject.js"
import ValidateProject from "./views/projects/ValidateProject.js"
import ShowProject from "./views/projects/ShowProject.js"
import ShowProjects from "./views/projects/ShowProjects.js"

// import authentification
import { setToken, getToken } from "./components/utils/useToken.js";
import { setRole, getRole } from "./components/utils/useRole.js";

function App() {
  let token = getToken();
  const changeSetRole = (value) => {
    setRole(value);
  }
  const ProtectedRouteAdmin = ({ token, children }) => {
    if (!token || !getRole()) {
      return <Navigate to="/connexion" replace />;
    }
    else if (token && getRole() !== "admin") {
      switch (getRole()) {
        case "entrepreneur":
          return <Navigate to="/profilEntrepreneur" replace />
          break;
        case "expert":
          return <Navigate to="/profilExpert" replace />
          break;
        case "investor":
          return <Navigate to="/profilInvestisseur" replace />
          break;
        default:
          return <Navigate to="/" replace />
      }
    }
    return children ? children : <Outlet />;
  };
  const ProtectedRouteEntrepreneur = ({ token, children }) => {
    if (!token || !getRole()) {
      return <Navigate to="/connexion" replace />;
    }
    else if (token && getRole() !== "entrepreneur") {
      switch (getRole()) {
        case "admin":
          return <Navigate to="/adminProfil" replace />
          break;
        case "expert":
          return <Navigate to="/profilExpert" replace />
          break;
        case "investor":
          return <Navigate to="/profilInvestisseur" replace />
          break;
        default:
          return <Navigate to="/" replace />
      }
    }
    return children ? children : <Outlet />;
  }
  const ProtectedRouteAuthentification = ({ token, children }) => {
    if (token && getRole()) {
      switch (getRole()) {
        case "admin":
          return <Navigate to="/adminProfil" replace />
          break;
        case "expert":
          return <Navigate to="/profilExpert" replace />
          break;
        case "investor":
          return <Navigate to="/profilInvestisseur" replace />
          break;
        case "entrepreneur":
          return <Navigate to="/profilEntrepreneur" replace />
          break;
        default:
          return <Navigate to="/" replace />
      }
    }
    return children ? children : <Outlet />;
  }
  const ProtectedRouteExpert = ({ token, children }) => {
    if (!token || !getRole()) {
      return <Navigate to="/connexion" replace />;
    }
    else if (token && getRole() !== "expert") {
      switch (getRole()) {
        case "admin":
          return <Navigate to="/adminProfil" replace />
          break;
        case "entrepreneur":
          return <Navigate to="/profilEntrepreneur" replace />
          break;
        case "investor":
          return <Navigate to="/profilInvestisseur" replace />
          break;
        default:
          return <Navigate to="/connexion" replace />
      }
    }
    return children ? children : <Outlet />;
  }

  const ProtectedRouteInvestor = ({ token, children }) => {
    if (!token || !getRole()) {
      return <Navigate to="/connexion" replace />;
    }
    else if (token && getRole() !== "investor") {
      switch (getRole()) {
        case "admin":
          return <Navigate to="/adminProfil" replace />
          break;
        case "entrepreneur":
          return <Navigate to="/profilEntrepreneur" replace />
          break;
        case "expert":
          return <Navigate to="/profilExpert" replace />
          break;
        default:
          return <Navigate to="/" replace />
      }
    }
    return children ? children : <Outlet />;
  }
  return (
    <div className="App">
      <Routes>
        {/*Public routes */}
        <Route index path="/" element={<Home />} />

        {/*Protection authentification routes */}
        <Route element={<ProtectedRouteAuthentification token={token} />}>
          <Route path="./views/login/LoginPage.js" element={<LoginPage changeSetRole={changeSetRole} setToken={setToken} />} />
          <Route path="./views/login/Register.js" element={<RegisterPage changeSetRole={changeSetRole} setToken={setToken} />} />
        </Route>


        {/*Protection admin route */}
        <Route element={<ProtectedRouteAdmin token={token} />}>
          <Route path="/adminProfil" element={<AdminProfil />} />
        </Route>

        {/*Protection entrepreneur routes */}
        <Route element={<ProtectedRouteEntrepreneur token={token} />}>
          <Route path="./views/profiles/profilEntrepreneur" element={<EntrepreneurProfil />} />
          <Route path="./views/projects/validateProject" element={<ValidateProject />} />
          <Route path="./views/projects/createProject" element={<CreateProject getToken={getToken()} />} />
          <Route path="./views/projets/ShowProjects" element={<ShowProjects getToken={getToken()} />} />
          <Route path="./views/projets/ShowProject/:id" element={<ShowProject getToken={getToken()} />} />
        </Route>

        {/*Protection expert routes */}
        <Route element={<ProtectedRouteExpert token={token} />}>
          <Route path="./views/profiles/ExpertProfil" element={<ExpertProfile />} />
        </Route>
        {/*Protection investor routes */}
        <Route element={<ProtectedRouteInvestor token={token} />}>
          <Route path="./views/profiles/InvestorProfil" element={<InvestorProfile />} />
        </Route>


        {/*Catch all other routes */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}


export default App;
