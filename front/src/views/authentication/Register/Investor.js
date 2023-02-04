import { Box, Typography } from "@mui/material";
import React from "react";
import InputField from "../../../components/InputField";
import UnordonedList from "../../../components/UnordonedList";
import ButtonForm from "../../../components/ButtonForm";
import ProfilePhotoUpdate from "../../../components/PhotoUpload";

const Investor = ({
    handleCompanyInvestor,
    handleDescriptionInvestor,
    valuesTheme,
    setThemeProject,
    themeProject,
    image,
    setImage,
    handleSubmit,
    showPrevious,
}) => {
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
                label={"Comment s'appelle votre organisation ?"}
                name={"companyInvestor"}
                type={"text"}
                placeholder={"Votre organisation"}
                idName={"inputField-company-investor"}
                onChange={handleCompanyInvestor}
            />

            <InputField
                label={
                    "Parlez-nous de vous, qui vous êtes, vos expériences passées et votre ambition prochaine à IB ?"
                }
                name={"descriptionInvestor"}
                type={"textarea"}
                placeholder={"Description"}
                idName={"inputField-description-investor"}
                onChange={handleDescriptionInvestor}
                multiline
            />
            <Box>
                <Typography variant="body1" className="lato">
                    Quel thèmes vous intéresse ?
                </Typography>
                <UnordonedList
                    valuesOption={valuesTheme}
                    selectedFromList={themeProject}
                    setSelectedFromList={setThemeProject}
                />
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

export default Investor;
