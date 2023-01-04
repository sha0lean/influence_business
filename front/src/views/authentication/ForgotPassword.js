import React, {useState,  useEffect } from "react";
import {api} from "../../configApi.js";
import "../../assets/scss/forgot-password.scss";
import ButtonForm from "../../components/ButtonForm.jsx";
import InputField from "../../components/InputField.jsx";
import axios from "axios";
import {
    Link
} from "react-router-dom";

async function forgotPassword(credentials){
    try{
        return await axios.post(api.url + "/forgot-password", credentials, {
            timeout: 2000,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
        .then(({data}) => {
            console.log("data : ",data);
            return data;
        })
    }
    catch(err){
        return err.response.data;
    }
    
}

function ForgotPassword(){
    const [errorMessage,setErrorMessage] = useState(null)
    const [message,setMessage] = useState(null)
    const [email,setUserEmail] = useState(null)
    function handleEmailChange(event){
        const emailContainer = document.getElementById("inputField-email");
        setUserEmail(emailContainer.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        const response = await forgotPassword({
            email: email
        })
        let errorMessageContainer;
        let messageContainer;
        //When we receive the response
        if(response){
            if(response.mailSent){
                setMessage(response.message)
                setErrorMessage(null);
                errorMessageContainer = document.querySelector("#errorMessage");
                errorMessageContainer.setAttribute("display:", "none")
                messageContainer = document.querySelector("#message");
                messageContainer.setAttribute("display","block")
            }
            else{
                setMessage(null);
                setErrorMessage(response.error)
                messageContainer = document.querySelector("#message");
                messageContainer.setAttribute("display","none");
                errorMessageContainer = document.querySelector("#errorMessage");
                errorMessageContainer.setAttribute("display", "block")
            }
        }
        else{
            setMessage(null);
            setErrorMessage("Erreur interne. Veuillez réessayer");
            messageContainer = document.querySelector("#message");
            messageContainer.setAttribute("display","none")
            errorMessageContainer = document.querySelector("#errorMessage");
            errorMessageContainer.setAttribute("display", "block")
        }
    }
    return(
        <div id="mainContainerResetPassword">
            <h1 className="lato">Reset password</h1>
            <div id="resetPasswordContainer">
                <p className="lato">Veuillez entrer votre mail afin de réinitialiser votre mot de passe</p>
                <form id="containerFormResetPassword" onSubmit={handleSubmit}>
                    <InputField  label={"Email"} name={"email"} type={"email"} placeholder={"Email"}  idName={"inputField-email"}   onChange={handleEmailChange}/>
                    <div id="containerSend">
                        <ButtonForm  content={"Réinitialisation du mot de passe"}/>
                    </div>
                    {errorMessage && <p id="errorMessage">{errorMessage}</p>}
                    {message && <p id="message">{message}</p>}
                </form>
            </div>

        </div>
    )
}

export default ForgotPassword;