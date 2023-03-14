import React, { useState, useEffect } from "react";
import { api } from "../../configApi.js";
import "../../assets/scss/pages/login.scss";
import ButtonForm from "../../components/ButtonForm.jsx";
import InputField from "../../components/InputField.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, FormControl, Typography } from "@mui/material";

async function loginUser(credentials) {
    try {
        return await axios
            .post(api.url + "/login", credentials, {
                timeout: 2000,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
            .then(({ data }) => {
                return data;
            });
    } catch (err) {
        return err.response.data;
    }
}

function LoginPage({ changeSetRole, setToken }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [email, setUserEmail] = useState(null);
    const [password, setUserPassword] = useState(null);
    function handleEmailChange(event) {
        const emailContainer = document.getElementById("inputField-email");
        setUserEmail(emailContainer.value);
    }
    function handlePasswordChange(event) {
        const passwordContainer = document.getElementById(
            "inputField-password"
        );
        setUserPassword(passwordContainer.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await loginUser({
            email: email,
            password: password,
        });
        //When we receive the response
        if (response) {
            if (response.message === "Vos identifiants sont corrects") {
                setToken(response.token);
                changeSetRole(response.role);
                window.location.reload();
            } else {
                setErrorMessage(response.message);
            }
        } else {
            setErrorMessage("Erreur interne");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                paddingY: "20px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "20px",
                    paddingBottom: "40px",
                    width: "100%",
                    maxWidth: "800px",
                    paddingX: "100px",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
                    my: "40px",
                    opacity: "0.9",
                }}
            >
                <Box sx={{ width: "100%", textAlign: "center", my: "40px" }}>
                    <Typography variant="h4">Connexion</Typography>
                    <Typography variant="h6" color="text.secondary">
                        Connectez-vous pour accéder à votre espace
                    </Typography>
                </Box>
                <FormControl
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                    }}
                    onSubmit={handleSubmit}
                >
                    <InputField
                        label={"Email"}
                        name={"email"}
                        type={"email"}
                        placeholder={"Email"}
                        idName={"inputField-email"}
                        onChange={handleEmailChange}
                    />
                    <InputField
                        label={"Mot de passe"}
                        name={"password"}
                        type={"password"}
                        placeholder={"Password"}
                        idName={"inputField-password"}
                        onChange={handlePasswordChange}
                    />

                    {errorMessage && (
                        <p className="lato" id="errorMessage">
                            {errorMessage}
                        </p>
                    )}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            paddingTop: "20px",
                            paddingBottom: "20px",
                        }}
                    >
                        <Link
                            to="/forgot-password"
                            style={{
                                textDecoration: "underline",
                                color: "inherit",
                            }}
                        >
                            Mot de passe oublié ?
                        </Link>
                    </Typography>
                    <ButtonForm content={"Se connecter"} />
                </FormControl>
            </Box>
        </Box>
    );
}

export default LoginPage;
