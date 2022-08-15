import React, {useState,  useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import {api} from "../configApi.js";
import ButtonForm from "../components/ButtonForm.jsx";
import InputField from "../components/InputField.jsx";
async function loginUser(credentials){
    return fetch(api.url + "/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json());
}


function LoginPage({changeSetRole,setToken}){
    const [email,setUserEmail] = useState(null)
    const [password,setUserPassword] = useState(null)
    function handleEmailChange(event){
        const emailContainer = document.getElementById("inputField-email");
        setUserEmail(emailContainer.value);
    }
    function handlePasswordChange(event){
        const passwordContainer = document.getElementById("inputField-password");
        setUserPassword(passwordContainer.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        const response = await loginUser({
            email: email,
            password: password
        })
        if(response.message === "Your credentials are correct"){
            setToken(response.token);
            changeSetRole(response.role);
            window.location.reload();
        }
        else{
            alert("Mauvais identifiants")
        }
    }
    return(
        <div id="login-container">
            <NavBar/>
            <h1>Page de connexion</h1>
            <form id="login-form" onSubmit={handleSubmit}>
                <InputField name={"email"} type={"email"} idName={"inputField-email"} placeholder={"Entrez votre email"} onChange={handleEmailChange}/>
                <InputField name={"password"} type={"password"} idName={"inputField-password"} placeholder={"Entrez votre mot de passe"} onChange={handlePasswordChange}/>
                <ButtonForm content={"Se connecter"}/>
            </form>        
            
        </div>
    )
}

export default LoginPage;
