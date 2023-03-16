import React, { useState, useEffect } from "react";
import "../assets/scss/pages/login.scss";
import ButtonForm from "../components/ButtonForm.jsx";
import InputField from "../components/InputField.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, FormControl, Typography } from "@mui/material";

function ContactUs() {
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
                    <Typography variant="h4">Contact</Typography>
                    <Typography variant="h6" color="text.secondary">
                        N'hésitez pas à nous contacter via ce formulaire :
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
                >
                    <InputField
                        label={"Email"}
                        name={"email"}
                        type={"email"}
                        placeholder={"Entrez votre Email"}
                        idName={"inputField-email"}
                    />
                    <InputField
                        label={"Message"}
                        name={"message"}
                        type={"text-area"}
                        placeholder={"Message"}
                    />

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            paddingBottom: "20px",
                        }}
                    >
                        Nous serons de vous répondre dans les plus brefs délais.
                    </Typography>
                    <ButtonForm
                        content={"Envoyer"}
                    />
                </FormControl>
            </Box>
        </Box>
    );
}

export default ContactUs;
