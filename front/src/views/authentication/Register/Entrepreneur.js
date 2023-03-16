import React, { useState } from "react";
import InputField from "../../../components/InputField";
import { Box, Grid, Slider, Typography } from "@mui/material";
import UnordonedList from "../../../components/UnordonedList";
import ButtonForm from "../../../components/ButtonForm";
import ProfilePhotoUpdate from "../../../components/PhotoUpload";

const Entrepreneur = ({
    handleNameProjectChange,
    handleDescriptionChange,
    valuesTheme,
    handlePitchProject,
    handleSensProject,
    handleProposeValue,
    handleMontantInvestissement,
    image,
    setImage,
    themeProject,
    setThemeProject,
    definitionProjet,
    setDefinitionProjet,
    analyseProjetChoixStrategique,
    setAnalyseProjetChoixStrategique,
    planOperationnel,
    setPlanOperationnel,
    actionDeveloppement,
    setActionDeveloppement,
    renforcementPersonnel,

    handleSubmit,
    showPrevious,
}) => {
    const modules = [
        {
            label: "Definition de projet",
            state: "definitionProjet",
            value: definitionProjet,
        },
        {
            label: "Analyse du projet et choix stratégique",
            state: "analyseProjetChoixStrategique",
            value: analyseProjetChoixStrategique,
        },
        {
            label: "Plan opérationnel",
            state: "planOperationnel",
            value: planOperationnel,
        },
        {
            label: "Action de développement",
            state: "actionDeveloppement",
            value: actionDeveloppement,
        },
    ];

    const handleSliderChange = (event, newValue, state) => {
        switch (state) {
            case "definitionProjet":
                setDefinitionProjet(newValue);
                break;
            case "analyseProjetChoixStrategique":
                setAnalyseProjetChoixStrategique(newValue);
                break;
            case "planOperationnel":
                setPlanOperationnel(newValue);
                break;
            case "actionDeveloppement":
                setActionDeveloppement(newValue);
                break;
            default:
                break;
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                gap: 2,
            }}
        >
            <ProfilePhotoUpdate
                selectedFile={image}
                setSelectedFile={setImage}
            />
            <InputField
                label={"Comment s'appelle votre projet ?"}
                name={"nomProject"}
                type={"text"}
                placeholder={"Nom du projet"}
                idName={"inputField-name-project"}
                onChange={handleNameProjectChange}
            />
            <InputField
                label={
                    "Parlez-nous de vous, qui vous êtes, vos expériences passées et votre ambition prochaine à travers ce projet ?"
                }
                name={"description"}
                type={"textarea"}
                placeholder={"Description"}
                idName={"inputField-description"}
                onChange={handleDescriptionChange}
                multiline
            />
            <Box>
                <Typography variant="body1" className="lato">
                    Quel est le thème de votre projet ?
                </Typography>
                <UnordonedList
                    valuesOption={valuesTheme}
                    selectedFromList={themeProject}
                    setSelectedFromList={setThemeProject}
                />
            </Box>
            <InputField
                label={"Pitchez-nous votre projet"}
                name={"pitchProject"}
                type={"textarea"}
                placeholder={"Description du projet"}
                idName={"inputField-pitch-project"}
                onChange={handlePitchProject}
            />
            <InputField
                label={
                    "En quoi ce projet est important pour vous ? En quoi fait-il du sens dans votre vie ?"
                }
                name={"importantProject"}
                type={"textarea"}
                placeholder={"Un projet qui a du sens"}
                idName={"inputField-pitch-project"}
                onChange={handleSensProject}
            />
            <InputField
                label={"Quelle est votre proposition de valeur ?"}
                name={"value"}
                type={"textarea"}
                placeholder={"Proposition de valeur"}
                idName={"inputField-propose-value"}
                onChange={handleProposeValue}
            />
            <InputField
                label={"Quel est le montant d'investissement nécessaire ?"}
                name={"investissement"}
                type={"text"}
                placeholder={"Montant d'investissement"}
                idName={"inputField-montant-investissement"}
                onChange={handleMontantInvestissement}
            />
            <Typography variant="body1">
                Sur une échelle de 0 à 100, comment vous placeriez-vous sur ces
                modules ?
            </Typography>
            <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    {modules.map((module) => (
                        <Grid item xs={12} md={6} key={module.label}>
                            <Box>
                                <Typography variant="body2" gutterBottom>
                                    {module.label}
                                </Typography>
                                <Slider
                                    value={module.value}
                                    onChange={(event, newValue) =>
                                        handleSliderChange(
                                            event,
                                            newValue,
                                            module.state
                                        )
                                    }
                                    max={100}
                                    step={1}
                                    sx={{
                                        color: "primary.main",
                                        "& .MuiSlider-thumb": {
                                            backgroundColor: "primary.main",
                                        },
                                    }}
                                />
                                <Typography variant="body2" gutterBottom>
                                    {module.value}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <ButtonForm content={"Précédent"} onClick={showPrevious} />
                <ButtonForm content={"S'inscrire"} onClick={handleSubmit} />
            </Box>
        </Box>
    );
};

export default Entrepreneur;
