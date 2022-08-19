import './App.css';
import React, { useState } from "react"
import { useRoutes } from "react-router-dom"
import Home from "./views/Home.js"
import AdminProfil from "./views/admin/AdminProfil.js"
import CreateProject from "./views/entrepreneur/CreateProject.js"
import EntrepreneurProfil from "./views/entrepreneur/EntrepreneurProfil.js"
import ValidateProject from "./views/admin/ValidateProject.js"
import LoginPage from "./views/authentification/LoginPage.js"
import RegisterPage from "./views/authentification/RegisterPage.js";
import Missing from "./views/Missing.js"
import ExpertProfil from "./views/expert/ExpertProfil.js"
import InvestorProfil from "./views/investor/InvestorProfil.js"
import ShowProject from "./views/feed/ShowProject.js"
import ShowProjects from "./views/feed/ShowProjects.js"

import Routes from "./routes";
function App() {

  return (
    <div className="App">
        <Routes/>
    </div>
  );
}


export default App;
