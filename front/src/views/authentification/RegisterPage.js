import React, { useState } from "react";
import { api } from "../../configApi.js";
import axios from "axios";

//forms
import ButtonForm from "../../components/forms/ButtonForm.jsx";
import InputField from "../../components/forms/InputField.jsx";
import SelectField from "../../components/forms/SelectField.jsx";

async function registerUser(credentials) {
    try {
        return await axios.post(api.url + "/register", credentials, {
            timeout: 2000,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
            .then(({ data }) => {
                return data;
            })
    }
    catch (err) {
        alert("temps de requête dépassé.");
    }
}


function RegisterPage({ changeSetRole, setToken }) {
    const [email, setUserEmail] = useState(null)
    const [first_name, setUserFirstName] = useState(null)
    const [last_name, setUserLastName] = useState(null)
    const [role, setUserRole] = useState(null)
    const [password, setUserPassword] = useState(null)
    function handleEmailChange(event) {
        const emailContainer = document.getElementById("inputField-email");
        setUserEmail(emailContainer.value);
    }
    function handlePasswordChange(event) {
        const passwordContainer = document.getElementById("inputField-password");
        setUserPassword(passwordContainer.value);
    }
    function handleFirstNameChange(event) {
        const firstNameContainer = document.getElementById("inputField-first-name");
        setUserFirstName(firstNameContainer.value);
    }
    function handleLastNameChange(event) {
        const lastNameContainer = document.getElementById("inputField-last-name");
        setUserLastName(lastNameContainer.value);
    }
    function handleRoleChange(event) {
        const roleContainer = document.getElementById("selectField-role");
        setUserRole(roleContainer.value);
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
        if (response.message === "Register successful") {
            setToken(response.token);
            changeSetRole(response.role);
            window.location.reload();
        }
        else {
            alert("Mauvais identifiants")
        }
    }
    const valuesOption = ["entrepreneur", "investor", "expert"];
    return (
        <div id="login-container">
            <h1>Page d'inscription</h1>
            <form id="login-form" onSubmit={handleSubmit}>
                <InputField name={"prénom"} type={"text"} placeholder={"Entrez votre prénom"} idName={"inputField-first-name"} onChange={handleFirstNameChange} />
                <InputField name={"nom"} type={"text"} placeholder={"Entrez votre nom"} idName={"inputField-last-name"} onChange={handleLastNameChange} />
                <SelectField name={"selectRole"} idName={"selectField-role"} valuesOption={valuesOption} onChange={handleRoleChange} />
                <InputField name={"email"} type={"email"} placeholder={"Entrez votre email"} idName={"inputField-email"} onChange={handleEmailChange} />
                <InputField name={"password"} type={"password"} placeholder={"Entrez votre mot de passe"} idName={"inputField-password"} onChange={handlePasswordChange} />
                <ButtonForm content={"S'inscrire"} />
            </form>

        </div>
    )
}

export default RegisterPage;