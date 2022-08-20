import React, { useState } from "react";
import axios from "axios";
import { api } from "../../configApi.js";

import ButtonForm from "../../components/ButtonForm.jsx";
import InputField from "../../components/InputField.jsx";
import SelectField from "../../components/SelectField.jsx";


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


function Register({ changeSetRole, setToken }) {
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
        <>
            <main>
                <form id="login-form" onSubmit={handleSubmit}>
                    <section className="absolute w-full h-full">
                        <div
                            className="absolute top-0 w-full h-full bg-indigo-900"
                        ></div>
                        <div className="container mx-auto px-4 h-full">
                            <div className="flex content-center items-center justify-center h-full">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">


                                        {/* HEAD FORM */}
                                        <div className="rounded-t mb-0 px-6 py-6">
                                            <div className="text-center mb-3">
                                                <h6 className="text-gray-600 text-sm font-bold">
                                                    Inscription
                                                </h6>
                                            </div>
                                            <div className="btn-wrapper text-center">
                                                <button
                                                    className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                                                    type="button"
                                                    style={{ transition: "all .15s ease" }}
                                                >
                                                    <img
                                                        alt="..."
                                                        className="w-5 mr-1"
                                                        src={require("../../assets/img/google.svg").default}
                                                    />
                                                    Google
                                                </button>
                                            </div>
                                            <hr className="mt-6 border-b-1 border-gray-400" />
                                        </div>



                                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0 ">
                                            <div className="text-gray-500 text-center mb-6 font-bold">
                                                <small>ou inscrivez-vous avec votre email</small>
                                            </div>
                                            {/* FORMULAIRE */}
                                            <form>
                                                <div className="w-full mb-3">
                                                    <InputField
                                                        name={"email"}
                                                        type={"email"}
                                                        placeholder={"Entrez votre email"}
                                                        idName={"inputField-email"}
                                                        onChange={handleEmailChange} />
                                                </div>
                                                <div className="flex gap-4 flex-col sm:flex-row mb-6">
                                                    <div className="basis-1/2">
                                                        <InputField
                                                            name={"nom"}
                                                            type={"text"}
                                                            placeholder={"Entrez votre nom"}
                                                            idName={"inputField-last-name"}
                                                            onChange={handleLastNameChange} />
                                                    </div>
                                                    <div className="basis-1/2">
                                                        <InputField
                                                            name={"prénom"}
                                                            type={"text"}
                                                            placeholder={"Entrez votre prénom"}
                                                            idName={"inputField-first-name"}
                                                            onChange={handleFirstNameChange} />
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 flex-col sm:flex-row mb-6">
                                                    <div className="relative w-full">
                                                        <InputField
                                                            name={"mot de passe"}
                                                            type={"password"}
                                                            placeholder={"Entrez votre mot de passe"}
                                                            idName={"inputField-password"}
                                                            onChange={handlePasswordChange} />
                                                    </div>
                                                    <div className="relative w-full">
                                                        <InputField
                                                            name={"Confirmer mot de passe"}
                                                            type={"password"}
                                                            placeholder={"Entrez à nouveau votre mot de passe"}
                                                            idName={"inputField-password"}
                                                            onChange={handlePasswordChange} />
                                                    </div>
                                                </div>
                                                <div className="relative w-full mb-10">
                                                    <SelectField
                                                        name={"selectRole"}
                                                        idName={"selectField-role"}
                                                        valuesOption={valuesOption}
                                                        onChange={handleRoleChange} />
                                                </div>

                                                <ButtonForm content={"S'inscrire"} />

                                                <div>
                                                    <label className="inline-flex items-center cursor-pointer  mt-3">
                                                        <input
                                                            id="customCheckLogin"
                                                            type="checkbox"
                                                            className="cursor-pointer form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                                                            style={{ transition: "all .15s ease" }}
                                                        />
                                                        <span className="ml-2 text-sm font-semibold text-gray-700">
                                                            se souvenir de moi
                                                        </span>
                                                    </label>
                                                </div>

                                                <div className="text-center flex flex-wrap">
                                                    <div className="w-full">
                                                        <a
                                                            href="connexion"
                                                            onClick={e => e.preventDefault()}
                                                            className=""
                                                        >
                                                            <small>Déjà membre ?</small>
                                                        </a>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>
            </main>
        </>
    );
}

export default Register;