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
            return data;
        })
    }
    catch(err){
        return err.response.data;
    }
    
}

function ForgotPassword(){
    const [errorMessage,setErrorMessage] = useState(null)
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
        //When we receive the response
        if(response){
            if(response.message === "Email envoyé"){
                console.log("Le mail a été envoyé")
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
        <div id="mainContainerResetPassword">
            <h1 className="lato">Reset password</h1>
            <div id="resetPasswordContainer">
                <form id="containerFormResetPassword" onSubmit={handleSubmit}>
                    <InputField  label={"Email"} name={"email"} type={"email"} placeholder={"Email"}  idName={"inputField-email"}   onChange={handleEmailChange}/>
                </form>
            </div>

        </div>
    )
}

export default ForgotPassword;