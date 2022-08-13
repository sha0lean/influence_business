import React, {useCallback} from "react";
import NavBar from "../components/NavBar.jsx";

function LoginPage({user,onUserChange}){
    
    return(
        <div>
            <NavBar/>
            <button onClick={() => onUserChange("blabla")}>Cliquez moi</button>
            <button onClick={() => onUserChange(null)}>Cliquez moi pour vous déconnecter</button>
            <h1>page de connexion</h1>
        </div>
    )
}

export default LoginPage;
