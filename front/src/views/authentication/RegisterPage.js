import React, { useState } from "react";

import "../../assets/scss/pages/register.scss";

import { Box, FormControl, Typography, Card } from "@mui/material";
import Expert from "./Register/Expert.js";
import Entrepreneur from "./Register/Entrepreneur.js";

import Investor from "./Register/Investor.js";
import SignUp from "./Register/SignUp.js";

import { registerUser } from "../../services/user.js";

function hiddenShowPassword() {
    const img = document.querySelector("#containerPassword img");
    const input = document.querySelector(
        "#containerPassword .inputField input"
    );
    if (input.getAttribute("type") === "password") {
        input.setAttribute("type", "text");
    } else {
        input.setAttribute("type", "password");
    }
}

function RegisterPage({ changeSetRole, setToken }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [email, setUserEmail] = useState("");
    const [firstName, setUserFirstName] = useState("");
    const [lastName, setUserLastName] = useState("");
    const [role, setUserRole] = useState("investor");
    const [password, setUserPassword] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [project, setProject] = useState(null);
    const [pitchProject, setPitchProject] = useState("");
    const [themeProject, setThemeProject] = useState([]);
    const [selectedThemesExpert, setSelectedThemesExpert] = useState([]);
    const [sensProject, setSensProject] = useState(null);
    const [proposeValue, setProposeValue] = useState(null);
    const [montantInvestissement, setMontantInvestissement] = useState(null);
    const [renforcementPersonnel, setRenforcementPersonnel] = useState(50);
    const [strategieEntreprise, setStrategieEntreprise] = useState(50);
    const [influenceurMarketing, setInfluenceurMarketing] = useState(50);
    const [communicationDigitalePhysique, setCommunicationDigitalePhysique] =
        useState(50);
    const [financement, setFinancement] = useState(50);
    const [presentationExpert, setPresentationExpert] = useState("");
    const [experiencesExpert, setExperiencesExpert] = useState([]);
    const [workExpert, setWorkExpert] = useState([]);
    const [diplomesExpert, setDiplomesExpert] = useState([]);
    const [companyInvestor, setCompanyInvestor] = useState(null);
    const [descriptionInvestor, setDescriptionInvestor] = useState("");

    const [counter, setCounter] = useState(0);
    function handleEmailChange(e) {
        setUserEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setUserPassword(e.target.value);
    }
    function handleFirstNameChange(e) {
        setUserFirstName(e.target.value);
    }
    function handleLastNameChange(e) {
        setUserLastName(e.target.value);
    }
    function showNext() {
        setCounter(counter + 1);
    }
    function showPrevious() {
        setCounter(counter - 1);
    }
    const handleRoleChange = (e) => {
        setUserRole(e.target.value);
    };
    const handleNameProjectChange = async (e) => {
        setProject(e.target.value);
    };

    const handleDescriptionChange = async (e) => {
        setDescription(e.target.value);
    };

    const handleMontantInvestissement = async (e) => {
        setMontantInvestissement(e.target.value);
    };
    const handleProposeValue = async (e) => {
        setProposeValue(e.target.value);
    };
    const handlePresentation = async (e) => {
        setPresentationExpert(e.target.value);
    };

    const handleSensProject = async (e) => {
        setSensProject(e.target.value);
    };

    const handlePitchProject = async (e) => {
        setPitchProject(e.target.value);
    };

    const objectToString = (object) => {
        let string = "";
        for (let key in object) {
            string += object[key] + "^";
        }
        return string;
    };

    const handleSubmit = async (e) => {
        console.log("submit clicked");
        e.preventDefault();
        if (image) {
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => {
                setImage(reader.result);
            };
        }
        var response;
        let themeProjectString = "";
        themeProject.map((theme) => {
            themeProjectString += theme + ",";
        });

        if (role === "entrepreneur") {
            let noteModules =
                renforcementPersonnel +
                "," +
                strategieEntreprise +
                "," +
                influenceurMarketing +
                "," +
                communicationDigitalePhysique +
                "," +
                financement;

            console.log({
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
                role: role,
                file: image,
                projectName: project,
                presentation: description,
                themeProject: themeProjectString,
                descriptionProject: pitchProject,
                sensProject: sensProject,
                value: proposeValue,
                montantInvestissement: montantInvestissement,
                noteModules: noteModules,
            });

            response = await registerUser({
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
                role: role,
                file: image,
                projectName: project,
                presentation: description,
                themeProject: themeProjectString,
                descriptionProject: pitchProject,
                sensProject: sensProject,
                value: proposeValue,
                montantInvestissement: montantInvestissement,
                noteModules: noteModules,
            });
        } else if (role === "investor") {
            response = await registerUser({
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
                role: role,
                file: image,
                themeProject: themeProjectString,
                company: companyInvestor,
                description: descriptionInvestor,
            });
        } else if (role === "expert") {
            let selectedThemesExpertString = "";
            selectedThemesExpert.map((theme) => {
                selectedThemesExpertString += theme + ",";
            });

            let experiencesExpertString = "";
            experiencesExpert.map((experience) => {
                experiencesExpertString += objectToString(experience) + "|";
            });

            let diplomesExpertString = "";
            diplomesExpert.map((diplome) => {
                diplomesExpertString += objectToString(diplome) + "|";
            });

            response = await registerUser({
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
                role: role,
                file: image,
                presentation: presentationExpert,
                experiences: experiencesExpertString,
                work: workExpert,
                diplomes: diplomesExpertString,
                theme_interesting: selectedThemesExpertString,
            });
        }

        if (response.message === "Inscription valide") {
            setToken(response.token);
            changeSetRole(response.role);
            window.location.reload();
        } else {
            setErrorMessage(response.message);
        }
    };
    const handleCompanyInvestor = async (e) => {
        setCompanyInvestor(e.target.value);
    };

    const handleDescriptionInvestor = async (e) => {
        setDescriptionInvestor(e.target.value);
    };
    const valuesOption = ["expert", "investor", "entrepreneur"];
    const valuesTheme = [
        "Communication Services",
        "Consumer Discretionary",
        "Consumer Staples",
        "Energy",
        "Financials",
        "FinTech",
        "Health Care",
        "Industrials",
        "Information Technology",
        "Materials",
        "Real Estate",
    ];
    const valuesThemeExpert = [
        "Renforcement personnel",
        "Stratégie d'entreprise",
        "Influenceur marketing",
        "Communication digitale et physique",
        "Financement",
    ];
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

                minHeight: "100vh",
                paddingY: "40px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "40px",
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
                <FormControl onSubmit={handleSubmit}>
                    {counter == 0 && (
                        <>
                            <Typography
                                variant="h4"
                                fontWeight={"bold"}
                                textAlign={"center"}
                                sx={{
                                    fontSize: "2.5rem",
                                    lineHeight: "3.5rem",
                                    margin: "1.5rem",
                                }}
                            >
                                Créez votre compte !
                            </Typography>
                            <SignUp
                                firstName={firstName}
                                handleFirstNameChange={handleFirstNameChange}
                                lastName={lastName}
                                handleLastNameChange={handleLastNameChange}
                                email={email}
                                handleEmailChange={handleEmailChange}
                                password={password}
                                handlePasswordChange={handlePasswordChange}
                                role={role}
                                handleRoleChange={handleRoleChange}
                                valuesOption={valuesOption}
                                hiddenShowPassword={hiddenShowPassword}
                                showNext={showNext}
                            />
                        </>
                    )}
                    {counter == 1 && role === "entrepreneur" && (
                        <>
                            <Typography
                                variant="h4"
                                fontWeight={"bold"}
                                textAlign={"center"}
                                sx={{
                                    fontSize: "2.5rem",
                                    lineHeight: "3.5rem",
                                    margin: "1.5rem",
                                }}
                            >
                                Créez votre profil d'entrepreneur !
                            </Typography>
                            <Entrepreneur
                                handleNameProjectChange={
                                    handleNameProjectChange
                                }
                                handleDescriptionChange={
                                    handleDescriptionChange
                                }
                                valuesTheme={valuesTheme}
                                handlePitchProject={handlePitchProject}
                                handleSensProject={handleSensProject}
                                handleProposeValue={handleProposeValue}
                                handleMontantInvestissement={
                                    handleMontantInvestissement
                                }
                                themeProject={themeProject}
                                setThemeProject={setThemeProject}
                                image={image}
                                setImage={setImage}
                                handleSubmit={handleSubmit}
                                renforcementPersonnel={renforcementPersonnel}
                                setRenforcementPersonnel={
                                    setRenforcementPersonnel
                                }
                                strategieEntreprise={strategieEntreprise}
                                setStrategieEntreprise={setStrategieEntreprise}
                                influenceurMarketing={influenceurMarketing}
                                setInfluenceurMarketing={
                                    setInfluenceurMarketing
                                }
                                communicationDigitalePhysique={
                                    communicationDigitalePhysique
                                }
                                setCommunicationDigitalePhysique={
                                    setCommunicationDigitalePhysique
                                }
                                financement={financement}
                                setFinancement={setFinancement}
                                showPrevious={showPrevious}
                            />
                        </>
                    )}
                    {counter === 1 && role === "expert" && (
                        <>
                            <Typography
                                variant="h4"
                                fontWeight={"bold"}
                                textAlign={"center"}
                                sx={{
                                    fontSize: "2.5rem",
                                    lineHeight: "3.5rem",
                                    margin: "1.5rem",
                                }}
                            >
                                Créez votre profil d'expert !
                            </Typography>
                            <Expert
                                handlePresentation={handlePresentation}
                                valuesThemeExpert={valuesThemeExpert}
                                selectedThemesExpert={selectedThemesExpert}
                                setSelectedThemesExpert={
                                    setSelectedThemesExpert
                                }
                                experiencesExpert={experiencesExpert}
                                setExperiencesExpert={setExperiencesExpert}
                                diplomesExpert={diplomesExpert}
                                setDiplomesExpert={setDiplomesExpert}
                                workExpert={workExpert}
                                setWorkExpert={setWorkExpert}
                                image={image}
                                setImage={setImage}
                                handleSubmit={handleSubmit}
                                showPrevious={showPrevious}
                            />
                        </>
                    )}
                    {counter === 1 && role === "investor" && (
                        <>
                            <Typography
                                variant="h4"
                                fontWeight={"bold"}
                                textAlign={"center"}
                                sx={{
                                    fontSize: "2.5rem",
                                    lineHeight: "3.5rem",
                                    margin: "1.5rem",
                                }}
                            >
                                Créez votre profil d'investisseur !
                            </Typography>
                            <Investor
                                handleCompanyInvestor={handleCompanyInvestor}
                                handleDescriptionInvestor={
                                    handleDescriptionInvestor
                                }
                                valuesTheme={valuesTheme}
                                themeProject={themeProject}
                                setThemeProject={setThemeProject}
                                image={image}
                                setImage={setImage}
                                handleSubmit={handleSubmit}
                                showPrevious={showPrevious}
                            />
                        </>
                    )}
                    {errorMessage && (
                        <p className="lato" id="errorMessage">
                            {errorMessage}
                        </p>
                    )}
                    {/*
                    <Box id="containerDemarcation">
                        <hr/>
                        <p className="lato">OU</p>
                    </Box>
                    
                    <Box id="containerGoogle">
                        <img src={require("../../assets/images/google.png")} alt="logo google"/>
                        <p className="lato">S'inscrire avec google</p>
                    </Box>
                    <Box id="containerLinkedin">
                        <img src={require("../../assets/images/linkedin.png")} alt="logo linkedin"/>
                        <p className="lato">S'inscrire avec linkedin</p>
                    </Box> */}
                </FormControl>
            </Box>
        </Box>
    );
}

export default RegisterPage;
