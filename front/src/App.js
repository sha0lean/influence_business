import './App.css';
import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom"
import Home from "./views/Home.js"
import AdminProfil from "./views/AdminProfil.js"
import CreateProject from "./views/CreateProject.js"
import EntrepreneurProfil from "./views/EntrepreneurProfil.js"
import ValidateProject from "./views/ValidateProject.js"
import LoginPage from "./views/LoginPage.js"
import RegisterPage from "./views/RegisterPage.js";
import Missing from "./views/Missing.js"
import ExpertProfil from "./views/ExpertProfil.js"
import InvestorProfil from "./views/InvestorProfil.js"
import ShowProject from "./views/ShowProject.js"
import ShowProjects from "./views/ShowProjects.js"

import {setToken, getToken,removeToken} from "./components/utils/useToken.js";
import {setRole,getRole,removeRole} from "./components/utils/useRole.js";
function App() {
  let token = getToken();
  const changeSetRole = (value) => {
    setRole(value);
  }
  const ProtectedRouteAdmin = ({token,children}) => {
    if(!token || !getRole()){
      return <Navigate to="/connexion" replace />;
    }
    else if(token && getRole() !== "admin"){
      switch(getRole()){
        case "entrepreneur":
          return <Navigate to="/profilEntrepreneur" replace/>
          break;
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
  const ProtectedRouteEntrepreneur = ({token,children}) => {
    if(!token || !getRole()){
      return <Navigate to="/connexion" replace />;
    }
    else if(token && getRole() !=="entrepreneur"){
      switch(getRole()){
        case "admin":
          return <Navigate to="/adminProfil" replace/>
          break;
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
  }
  const ProtectedRouteAuthentification = ({token,children}) => {
    if(token && getRole()){
      switch(getRole()){
        case "admin":
          return <Navigate to="/adminProfil" replace/>
          break;
        case "expert":
          return <Navigate to="/profilExpert" replace/>
          break;
        case "investor":
          return <Navigate to="/profilInvestisseur" replace/>
          break;
        case "entrepreneur": 
          return <Navigate to="/profilEntrepreneur" replace/>
          break;
        default: 
          return <Navigate to="/" replace/>
      }
    }
    return children ? children: <Outlet/>;
  }
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
  return (
    <div className="App">
          <Routes>
            {/*Public routes */}
              <Route index path="/" element={<Home/>}/>

              {/*Protection authentification routes */}
              <Route element={<ProtectedRouteAuthentification token={token}/>}>
                <Route path = "/connexion" element={<LoginPage changeSetRole={changeSetRole} setToken={setToken}/>}/>
                <Route path="/inscription" element={<RegisterPage changeSetRole={changeSetRole} setToken={setToken}/>}/>
              </Route>

              
              {/*Protection admin route */}
              <Route element={<ProtectedRouteAdmin token={token}/>}>
                <Route path="/adminProfil" element={<AdminProfil getToken={getToken()}/>}/>
              </Route>
                
              {/*Protection entrepreneur routes */}
              <Route element={<ProtectedRouteEntrepreneur token={token} />}>
                <Route path = "/profilEntrepreneur" element={<EntrepreneurProfil/>}/>
                <Route path = "/validateProject" element={<ValidateProject/>}/>
                <Route path="/createProject" element={<CreateProject getToken={getToken()}/>}/>
                <Route path="/projets/" element={<ShowProjects getToken={getToken()}/>}/>
                <Route path="/projet/:id" element={<ShowProject getToken={getToken()}/>}/>
              </Route>

              {/*Protection expert routes */}
              <Route element={<ProtectedRouteExpert token={token} />}>
                <Route path="/profilExpert" element={<ExpertProfil/>}/>
              </Route>

              {/*Protection investor routes */}
              <Route element={<ProtectedRouteInvestor token={token} />}>
                <Route path="/profilInvestisseur" element={<InvestorProfil/>}/>
              </Route>
             
              
            {/*Catch all other routes */}
            <Route path="*" element={<Missing/>}/>
          </Routes>
    </div>
  );
}


export default App;
