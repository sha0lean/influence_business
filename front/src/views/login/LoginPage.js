// import React, {useCallback} from "react";
import NavBar from "../../components/NavBar.jsx";
import Header from "../../components/Header.jsx";
import Login from "../../components/logins/Login.jsx";

function LoginPage({ user, onUserChange }) {

    return (
        <div>
            <Header />
            <Login />
            <button onClick={() => onUserChange("blabla")}>Cliquez moi</button>
            <button onClick={() => onUserChange(null)}>Cliquez moi pour vous déconnecter</button>
            <br /><br />
            <NavBar />
        </div>
    )
}

export default LoginPage;
