import { Box, Button, TextareaAutosize, Typography } from "@mui/material";
import React from "react";
import InputField from "../../../components/InputField";
import UnordonedList from "../../../components/UnordonedList";
import { BiUpload } from "react-icons/bi";
import ButtonForm from "../../../components/ButtonForm";
import ProfilePhotoUpdate, {
    ProfilePhotoUpload,
} from "../../../components/PhotoUpload";
import ExperienceForm from "../../../components/ListForm";
import ListForm from "../../../components/ListForm";

const Expert = ({
    handlePresentation,
    valuesThemeExpert,
    experiencesExpert,
    setExperiencesExpert,

    diplomesExpert,
    setDiplomesExpert,

    workExpert,
    setWorkExpert,

    selectedThemesExpert,
    setSelectedThemesExpert,

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
                label={"Qui êtes vous ?"}
                name={"identite"}
                type={"textarea"}
                placeholder={"Présentez-vous"}
                idName={"inputField-presentation"}
                onChange={handlePresentation}
                multiline
            />
            <Box>
                <Typography variant="body1" className="lato">
                    Quel est le thème de votre projet ?
                </Typography>

                <UnordonedList
                    valuesOption={valuesThemeExpert}
                    selectedFromList={selectedThemesExpert}
                    setSelectedFromList={setSelectedThemesExpert}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    gap: 2,
                    my: 2,
                }}
            >
                <ListForm
                    listItems={experiencesExpert}
                    setListItems={setExperiencesExpert}
                    label={"Une Experience"}
                    type={"experience"}
                />
                <ListForm
                    listItems={diplomesExpert}
                    setListItems={setDiplomesExpert}
                    label={"Un Diplome"}
                    type={"diplome"}
                />
                {/*
                <ListForm
                    listItems={workExpert}
                    setListItems={setWorkExpert}
                    label={"Un Travail"}
                />
                */}
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

export default Expert;
