import React, { useState, useEffect } from "react";
import {
    getAllEntrepreneurs,
    getEntrepreneurCompetences,
    getEntrepreneurSousCompetences,
    nameModules,
    saveEntrepreneur,
    saveUser,
} from "../services/user";
import { getToken } from "../utils/localStorage/useToken";
import { useParams } from "react-router-dom";
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox,
    Dialog,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Radio,
    RadioGroup,
    Typography,
    useTheme,
} from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import AddCompetence from "../components/AddCompetence";
import { getRole } from "../utils/localStorage/useRole";
import { saveSousCompetence } from "../services/user";

const Modules = () => {
    const theme = useTheme();
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [order, setOrder] = useState(0);
    const [competences, setCompetences] = useState([]);
    const [competenceIndex, setCompetenceIndex] = useState(0);
    const [sousCompetences, setSousCompetences] = useState([]);
    const [checkedCompetences, setCheckedCompetences] = useState([]);

    const handleSendMessage = () => {
        alert("Message envoyé par rapport aux compétences sélectionnées !");
        checkedCompetences.forEach((item) => {
            console.log(item);
        });
    };

    /**
     * Fonction qui calcule le score de chaque module une fois le staff a validé les compétences
     */
    const calculateScore = () => {
        const moduleMaxScore = 100;
        const moduleCompetenceLength = user.projectNotes.length;
        const moduleCompetencesMaxScore = user.projectNotes.map((_, index) => {
            return (
                moduleMaxScore /
                competences.filter((competence) => competence.order === index)
                    .length
            );
        });
        competences.forEach((competence) => {
            const sousCompentenceLength = sousCompetences.filter(
                (sousCompetence) =>
                    sousCompetence.id_competence === competence.id_competence
            ).length;
            const sousCompetenceMaxScore =
                moduleCompetencesMaxScore[competence.order] /
                sousCompentenceLength;
            let competenceScore = 0;
            sousCompetences.forEach((sousCompetence) => {
                if (sousCompetence.id_competence === competence.id_competence) {
                    if (sousCompetence.acquisition === 2) {
                        sousCompetence.value = sousCompetenceMaxScore;
                    } else if (sousCompetence.acquisition === 1) {
                        sousCompetence.value = sousCompetenceMaxScore / 2;
                    } else {
                        sousCompetence.value = 0;
                    }
                    competenceScore += sousCompetence.value;
                }
            });
            competence.value = competenceScore;
        });
        user.projectNotes = user.projectNotes.map((note, index) => {
            note = 0;
            competences.forEach((competence) => {
                if (competence.order === index) {
                    note += competence.value;
                }
            });
            return note;
        });

        setCompetences([...competences]);
        setSousCompetences([...sousCompetences]);
        setUser({ ...user });
    };

    const handleSaveChanges = async () => {
        if (role === "admin") {
            calculateScore();
            // save the sousCompetences dans la database
            sousCompetences.forEach(
                async (sousCompetence) =>
                    await saveSousCompetence({
                        token: getToken(),
                        name: sousCompetence.name,
                        id_entrepreneur: sousCompetence.id_entrepreneur,
                        id_sous_competence: sousCompetence.id_sous_competence,
                        id_competence: sousCompetence.id_competence,
                        acquisition: sousCompetence.acquisition,
                        value: sousCompetence.value,
                    })
            );

            // save the user projectNotes dans la database
            console.log(user.projectNotes);
            await saveEntrepreneur({
                token: getToken(),
                id_entrepreneur: user.id_entrepreneur,
                id_role: user.id_role,
                presentation: user.presentation,
                modulesValues: user.projectNotes.join(","),
                montantInvestissement: user.projectInvestment,
                projectName: user.projectName,
                projectTheme: user.projectTheme,
                projectDescription: user.projectDescription,
                projectValue: user.projectValue,
                theme_interesting: user.theme_interesting,
            });
        }
        window.location.reload();
        alert("Les modifications ont été enregistrées !");
    };

    const role = getRole();
    useEffect(() => {
        const fetch = async () => {
            const entrepreneurs = await getAllEntrepreneurs({
                token: getToken(),
            });
            const entrepreneur = entrepreneurs?.find((e) => e.id_role == id);
            entrepreneur.description = entrepreneur.presentation;
            entrepreneur.projectName = entrepreneur.projectName;
            entrepreneur.projectDescription = entrepreneur.projectDescription;
            entrepreneur.projectValue = entrepreneur.projectValue;
            entrepreneur.projectTheme = entrepreneur.projectTheme;
            entrepreneur.projectInvestment = entrepreneur.montantInvestissement;
            entrepreneur.projectModules = nameModules;
            entrepreneur.interests = entrepreneur.theme_interesting
                .split(",")
                .splice(0, -1);
            entrepreneur.projectNotes = entrepreneur.modulesValues
                .split(",")
                .map((item) => parseInt(item));
            setUser(entrepreneur);

            const data = {
                token: getToken(),
                id_entrepreneur: entrepreneur.id_entrepreneur,
            };
            const competences = await getEntrepreneurCompetences(data);
            setCompetences(competences);
            const sousCompetences = await getEntrepreneurSousCompetences(data);
            setSousCompetences(sousCompetences);
        };
        fetch();
    }, []); // direct on reload une fois

    //debugg f12
    useEffect(() => {
        console.log(user);
        console.log(competences);
        console.log(sousCompetences);
    }, [user, competences, sousCompetences]);

    // only admins changes
    const handleRadioChange = (event, sousComeptence) => {
        if (role === "admin") {
            sousComeptence.acquisition = parseInt(event.target.value);
            setSousCompetences([...sousCompetences]);
        }
    };

    return (
        <>
            <Dialog open={open}>
                <AddCompetence
                    setOpen={setOpen}
                    label={type}
                    id={user.id_entrepreneur}
                    order={order}
                    competenceId={competenceIndex}
                />
            </Dialog>

            <Typography variant="h4" sx={{ margin: "1rem" }}>
                Modules
            </Typography>
            <Typography
                variant="h6"
                sx={{ margin: "1rem" }}
                color="text.secondary"
            >
                {user.projectName}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    marginY: 2,
                    backgroundColor: theme.palette.background.default,
                }}
            >
                {/* ? : verifie si null */}
                {user.projectModules?.map((module, moduleIndex) => (
                    <Grid
                        container
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                        }}
                    >
                        <Grid item sx={10} md={10}>
                            <Accordion
                                key={moduleIndex}
                                sx={{
                                    width: "100%",
                                    padding: "1rem",
                                    display: "flex",
                                    flexDirection: "column",

                                    gap: 2,
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreRounded />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    <Typography>{module}</Typography>
                                    <Grid
                                        container
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <Grid xs={8} item>
                                            <Box>
                                                <LinearProgress
                                                    value={
                                                        user.projectNotes[
                                                        moduleIndex
                                                        ]
                                                    }
                                                    variant="determinate"
                                                    size="large"
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid sx={2} item>
                                            <Box>
                                                <Typography
                                                    variant="body2"
                                                    color={"text.secondary"}
                                                >
                                                    {
                                                        user.projectNotes[
                                                        moduleIndex
                                                        ]
                                                    }
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{
                                            alignSelf: "flex-start",
                                            margin: "0.5rem",
                                        }}
                                    >
                                        Compétences
                                    </Typography>
                                    {competences &&
                                        competences
                                            ?.filter(
                                                (competence) =>
                                                    competence.order ===
                                                    moduleIndex
                                            )
                                            .map((competence, compIndex) => (
                                                <Accordion
                                                    key={compIndex}
                                                    sx={{
                                                        width: "100%",
                                                        padding: "0.5rem",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent:
                                                            "center",
                                                        backgroundColor:
                                                            theme.palette
                                                                .background
                                                                .default,
                                                    }}
                                                >
                                                    <AccordionSummary
                                                        expandIcon={
                                                            <ExpandMoreRounded />
                                                        }
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                        sx={{
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <Typography variant="body1">
                                                            {competence.name}
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails
                                                        sx={{
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body1"
                                                            color="text.secondary"
                                                            sx={{
                                                                alignSelf:
                                                                    "flex-start",
                                                                margin: "0.5rem",
                                                            }}
                                                        >
                                                            Sous-Compétences
                                                        </Typography>
                                                        <Divider />
                                                        <List
                                                            sx={{
                                                                width: "100%",
                                                            }}
                                                        >
                                                            {sousCompetences
                                                                ?.filter(
                                                                    (
                                                                        sousCompetence
                                                                    ) =>
                                                                        sousCompetence.id_competence ===
                                                                        competence.id_competence
                                                                )
                                                                ?.map(
                                                                    (
                                                                        sousCompetence,
                                                                        sousCompIndex
                                                                    ) => (
                                                                        <ListItem
                                                                            sx={{
                                                                                display:
                                                                                    "flex",
                                                                                flexDirection:
                                                                                    "row",

                                                                                gap: 1,
                                                                            }}
                                                                        >
                                                                            <ListItemText
                                                                                primary={
                                                                                    sousCompetence.name
                                                                                }
                                                                            />
                                                                            <ListItemSecondaryAction>
                                                                                <FormControl>
                                                                                    <RadioGroup
                                                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                                                        name="radio-buttons-group"
                                                                                        value={
                                                                                            sousCompetence.acquisition
                                                                                        }
                                                                                        onChange={(
                                                                                            event
                                                                                        ) => {
                                                                                            handleRadioChange(
                                                                                                event,
                                                                                                sousCompetence
                                                                                            );
                                                                                        }}
                                                                                        sx={{
                                                                                            display:
                                                                                                "flex",
                                                                                            flexDirection:
                                                                                                "row",
                                                                                            gap: 1,
                                                                                        }}
                                                                                    >
                                                                                        <FormControlLabel
                                                                                            value={
                                                                                                0
                                                                                            }
                                                                                            control={
                                                                                                <Radio size="small" />
                                                                                            }
                                                                                            label="Non Acquis"
                                                                                        />
                                                                                        <FormControlLabel
                                                                                            value={
                                                                                                1
                                                                                            }
                                                                                            control={
                                                                                                <Radio />
                                                                                            }
                                                                                            label="En cours"
                                                                                        />
                                                                                        <FormControlLabel
                                                                                            value={
                                                                                                2
                                                                                            }
                                                                                            control={
                                                                                                <Radio />
                                                                                            }
                                                                                            label="Acquis"
                                                                                        />
                                                                                    </RadioGroup>
                                                                                </FormControl>
                                                                            </ListItemSecondaryAction>
                                                                        </ListItem>
                                                                    )
                                                                )}
                                                        </List>
                                                    </AccordionDetails>
                                                    <AccordionActions>
                                                        {role === "admin" && (
                                                            <Button
                                                                variant="contained"
                                                                size="small"
                                                                onClick={() => {
                                                                    setOpen(
                                                                        true
                                                                    );
                                                                    setType(
                                                                        "sous-compétence"
                                                                    );
                                                                    console.log(
                                                                        "competenceId : " +
                                                                        competence.id_competence
                                                                    );
                                                                    setCompetenceIndex(
                                                                        competence.id_competence
                                                                    );
                                                                    setSousCompetences(
                                                                        []
                                                                    );
                                                                }}
                                                            >
                                                                Ajouter une
                                                                sous-compétence
                                                            </Button>
                                                        )}
                                                    </AccordionActions>
                                                </Accordion>
                                            ))}
                                </AccordionDetails>
                                <AccordionActions>
                                    {role === "admin" && (
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => {
                                                setOpen(true);
                                                setType("competence");
                                                setOrder(moduleIndex);
                                            }}
                                        >
                                            Ajouter une compétence
                                        </Button>
                                    )}
                                </AccordionActions>
                            </Accordion>
                        </Grid>
                        {role === "expert" && (
                            <Grid item sx={1} md={1}>
                                <FormControlLabel
                                    sx={{
                                        margin: "1rem",
                                    }}
                                    control={<Checkbox defaultChecked />}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setCheckedCompetences([
                                            ...checkedCompetences,
                                            module,
                                        ]);
                                    }}
                                />
                            </Grid>
                        )}
                    </Grid>
                ))}
                {role === "expert" && (
                    <Button
                        sx={{
                            margin: "1rem",
                        }}
                        color="primary"
                        variant="contained"
                        onClick={handleSendMessage}
                    >
                        Envoyer un message
                    </Button>
                )}
                {role === "admin" && (
                    <Button
                        sx={{
                            margin: "1rem",
                        }}
                        color="primary"
                        variant="contained"
                        onClick={handleSaveChanges}
                    >
                        Sauvegarder les changements
                    </Button>
                )}
            </Box>
        </>
    );
};

export default Modules;
