import './App.css';
import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Home from "./views/Home.js"
import AdminProfil from "./views/AdminProfil.js"
import CreateProject from "./views/CreateProject.js"
import EntrepreneurProfil from "./views/EntrepreneurProfil.js"
import ValidateProject from "./views/ValidateProject.js"
import LoginPage from "./views/LoginPage.js"
function App() {
/*
  const ProtectedRoute = ({user, children}) => {
    
    if(!user){
      return <Navigate to="/LoginPage"/>
    }
    else if()
  }
    */
  return (
    <div className="App">
          <Routes>
              <Route index path="/" element={<Home/>}/>
              <Route path = "/adminProfil" element={<AdminProfil/>}/>
          </Routes>
    </div>
  );
}


export default App;
