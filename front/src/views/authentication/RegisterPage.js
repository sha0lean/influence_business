import React, {useState} from "react";
import NavBar from "../../components/NavBar.jsx";
import {api} from "../../configApi.js";
import ButtonForm from "../../components/ButtonForm.jsx";
import InputField from "../../components/InputField.jsx";
import SelectField from "../../components/SelectField.jsx";
import axios from "axios";
import "../../assets/scss/register.scss"
import {
    Link
} from "react-router-dom";
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
function hiddenShowPassword(){
    const img = document.querySelector("#containerPassword img");
    const input = document.querySelector("#containerPassword .inputField input");
    if(input.getAttribute("type") === "password"){
        input.setAttribute("type","text");
    }
    else{
        input.setAttribute("type","password");

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


        if(response.message === "Inscription valide"){

            setToken(response.token);
            changeSetRole(response.role);
            window.location.reload();
        }
        else{
            setErrorMessage(response.message)
        }
    }
    const valuesOption = ["entrepreneur","investor","expert"];
    return(
        <div id="mainContainerRegister">
            <h1 className="lato">Formulaire d'inscription</h1>
            <div id="registerContainer">
                <form id="containerFormRegister" onSubmit={handleSubmit}>
                    <div id="containerFirstLastName">
                        <div id="containerFirstName">
                            <InputField  label={"Prénom"} name={"firstname"} type={"text"} placeholder={"Prénom"}  idName={"inputField-first-name"}   onChange={handleFirstNameChange}/>
                        </div>
                        <div id="containerLastName">
                            <InputField  label={"Nom"} name={"lastname"} type={"text"} placeholder={"Nom"}  idName={"inputField-last-name"}  onChange={handleLastNameChange}/>
                        </div>
                    </div>
                    <div id="containerEmailPassword">
                        <div id="containerEmail">
                            <InputField  label={"Adresse mail"} name={"email"} type={"email"} placeholder={"Adresse mail"}  idName={"inputField-email"}  onChange={handleEmailChange}/>
                        </div>
                        <div id="containerPassword">
                            <img src={require("../../assets/images/oeil.png")} alt="logo oeil" onMouseDown={(hiddenShowPassword)} onMouseUp={(hiddenShowPassword)}/>
                            <InputField label={"Mot de passe"} name={"password"} type={"password"} placeholder={"Mot de passe"}  idName={"inputField-password"}  onChange={handlePasswordChange}/>
                        </div>
                    </div>
                    <div id="containerSelectRole">
                        <SelectField name={"selectRole"} idName={"selectField-role"} valuesOption={valuesOption} onChange={handleRoleChange}/>
                    </div>
                    {errorMessage && <p className="lato" id="errorMessage">{errorMessage}</p>}
                    <ButtonForm  content={"S'inscrire"}/>
                    <div id="containerDemarcation">
                        <hr/>
                        <p className="lato">OU</p>
                    </div>
                    <div id="containerGoogle">
                        <img src={require("../../assets/images/google.png")} alt="logo google"/>
                        <p className="lato">S'inscrire avec google</p>
                    </div>
                    <div id="containerLinkedin">
                        <img src={require("../../assets/images/linkedin.png")} alt="logo linkedin"/>
                        <p className="lato">S'inscrire avec linkedin</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;