import React, {useState} from "react";
import NavBar from "../../components/NavBar.jsx";
import {api} from "../../configApi.js";
import ButtonForm from "../../components/ButtonForm.jsx";
import InputField from "../../components/InputField.jsx";
import SelectField from "../../components/SelectField.jsx";
import axios from "axios";
import "../../assets/scss/register.scss"
async function registerUser(credentials){
    try{
        return await axios.post(api.url + "/register", credentials, {
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
        return err.response.data
    }
}


function RegisterPage({changeSetRole,setToken}){
    const [errorMessage,setErrorMessage] = useState(null)
    const [email,setUserEmail] = useState(null)
    const [first_name,setUserFirstName] = useState(null)
    const [last_name,setUserLastName] = useState(null)
    const [role,setUserRole] = useState("entrepreneur")
    const [password,setUserPassword] = useState(null)
    
    function handleEmailChange(event){
        const emailContainer = document.getElementById("inputField-email");
        setUserEmail(emailContainer.value);
    }
    function handlePasswordChange(event){
        const passwordContainer = document.getElementById("inputField-password");
        setUserPassword(passwordContainer.value);
    }
    function handleFirstNameChange(event){
        const firstNameContainer = document.getElementById("inputField-first-name");
        setUserFirstName(firstNameContainer.value);
    }
    function handleLastNameChange(event){
        const lastNameContainer = document.getElementById("inputField-last-name");
        setUserLastName(lastNameContainer.value);
    }
    const handleRoleChange = async e => {
        e.preventDefault();
        setUserRole(e.target.value);
    }
    

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await registerUser({
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
            role: role 
        })


        if(response.message === "Register successful"){

            setToken(response.token);
            changeSetRole(response.role);
            window.location.reload();
        }
        else{
            setErrorMessage(response.message)
            console.log("errorMessage : ",errorMessage)

        }
    }
    const valuesOption = ["entrepreneur","investor","expert"];
    return(
        <div id="mainContainerRegister">
            <h1>Page d'inscription</h1>
            <div id="registerContainer">
                <form id="containerFormRegister" onSubmit={handleSubmit}>
                    <div id="containerFirstLastName">
                        <div id="containerFirstName">
                            <InputField  name={"firstname"} type={"text"} placeholder={"Entrez votre prénom"} required={true} idName={"inputField-first-name"} onChange={handleFirstNameChange}/>
                        </div>
                        <div id="containerLastName">
                            <InputField name={"lastname"} type={"text"} placeholder={"Entrez votre nom"} required={true} idName={"inputField-last-name"} onChange={handleLastNameChange}/>
                        </div>
                    </div>
                    <div id="containerEmailPassword">
                        <div id="containerEmail">
                            <InputField  name={"email"} type={"email"} placeholder={"Entrez votre email"} required={true} idName={"inputField-email"} onChange={handleEmailChange}/>
                        </div>
                        <div id="containerPassword">
                            <InputField  name={"password"} type={"password"} placeholder={"Entrez votre mot de passe"} required={true} idName={"inputField-password"} onChange={handlePasswordChange}/>
                        </div>
                    </div>
                    <div id="selectRole">
                        <SelectField className="lato" name={"selectRole"} idName={"selectField-role"} valuesOption={valuesOption} onChange={handleRoleChange}/>
                    </div>
                    <ButtonForm className="lato" content={"S'inscrire"}/>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;