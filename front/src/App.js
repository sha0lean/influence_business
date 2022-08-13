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
import Missing from "./views/Missing.js"
function App() {
  const [user,setUser] = React.useState(null);

  const changeSetUser = (value) => {
    console.log("value : ",value);
    setUser(value);
  }
  const ProtectedRoute = ({user,children}) => {
    if(!user){
      return <Navigate to="/" replace />;
    }
    return children ? children: <Outlet/>;
  };
  return (
    <div className="App">
          <Routes>
            {/*Public routes */}
              <Route index path="/" element={<Home/>}/>
              <Route path = "/login" element={<LoginPage user={user} onUserChange={changeSetUser}/>}/>

            {/*Routes to protect */}
              
              <Route path = "/adminProfil" element={
                <ProtectedRoute user={user}> 
                  <AdminProfil/>
                </ProtectedRoute>}
              />
                
              <Route path = "/createProject" element={
                <ProtectedRoute user={user}>
                  <CreateProject/>
                </ProtectedRoute>}
              />
              <Route element={<ProtectedRoute user={user} />}>
                <Route path = "/entrepreneurProfil" element={<EntrepreneurProfil/>}/>
                <Route path = "/validateProject" element={<ValidateProject/>}/>
              </Route>
             
              
            {/*Catch all other routes */}
            <Route path="*" element={<Missing/>}/>
          </Routes>
    </div>
  );
}


export default App;
