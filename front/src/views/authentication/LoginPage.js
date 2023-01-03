import React, {useState,  useEffect } from "react";
import {api} from "../../configApi.js";
import "../../assets/scss/login.scss";
import ButtonForm from "../../components/ButtonForm.jsx";
import InputField from "../../components/InputField.jsx";
import axios from "axios";
import {
    Link
} from "react-router-dom";

async function loginUser(credentials){
    try{
        return await axios.post(api.url + "/login", credentials, {
            timeout: 2000,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
        .then(({data}) => {
            return data;
        })
    }
    catch(err){
        return err.response.data;
    }
    
}

function LoginPage({changeSetRole,setToken}){
    const [errorMessage,setErrorMessage] = useState(null)
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
        //When we receive the response
        if(response){
            if(response.message === "Vos identifiants sont corrects"){
                setToken(response.token);
                changeSetRole(response.role);
                window.location.reload();
            }
            else{
                setErrorMessage(response.message)
                console.log("errorMessage : ",errorMessage)
            }
        }
        else{
            setErrorMessage("Erreur interne");
        }
    }
    
    return(
        <div id="mainContainerLogin">
            <h1 className="lato">Page de connexion</h1>
            <div id="loginContainer">
                <form id="containerFormLogin" onSubmit={handleSubmit}>
                    <div id="containerEmail">
                        <InputField  label={"Email"} name={"email"} type={"email"} placeholder={"Email"}  idName={"inputField-email"}   onChange={handleEmailChange}/>
                    </div>
                    <div id="containerPassword">
                        <InputField  label={"Mot de passe"} name={"password"} type={"password"} placeholder={"Password"}  idName={"inputField-password"}   onChange={handlePasswordChange}/>
                    </div>
                    <div id="containerLogin">
                        <p className="lato">
                            Mot de passe oublié ?
                        </p>
                        <ButtonForm  content={"Se connecter"}/>
                    </div>
                </form>
                <div id="containerDemarcation">
                    <hr/>
                    <p>OU</p>
                </div>
                <div id="containerGoogle">
                        <img src={require("../../assets/images/google.png")} alt="logo google"/>
                        <p className="lato">S'inscrire avec google</p>
                    </div>
                    <div id="containerLinkedin">
                        <img src={require("../../assets/images/linkedin.png")} alt="logo linkedin"/>
                        <p className="lato">S'inscrire avec linkedin</p>
                    </div>
                <div id="containerNoAccount">
                    <p className="lato">Vous n'avez pas de compte ?</p>
                    <Link to="/inscription"><button>S'inscrire</button></Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
