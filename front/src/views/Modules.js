import React, { useState, useEffect } from "react";
import {
    getAllEntrepreneurs,
    getEntrepreneurCompetences,
    getEntrepreneurSousCompetences,
    nameModules,
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
    FormGroup,
    Grid,
    IconButton,
    InputLabel,
    LinearProgress,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select,
    Typography,
    useTheme,
} from "@mui/material";
import {
    CheckBox,
    DeleteOutline,
    ExpandMoreRounded,
} from "@mui/icons-material";
import AddCompetence from "../components/AddCompetence";
import { getRole } from "../utils/localStorage/useRole";

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
    }, []);

    useEffect(() => {
        console.log(user);
        console.log(competences);
        console.log(sousCompetences);
    }, [user, competences, sousCompetences]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
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
                                                                                        onChange={
                                                                                            handleChange
                                                                                        }
                                                                                        value={
                                                                                            sousCompetence.acquisition
                                                                                        }
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
                                                        {role ===
                                                            "entrepreneur" && (
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
                                    {role === "entrepreneur" && (
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
                        Send message
                    </Button>
                )}
            </Box>
        </>
    );
};

export default Modules;
