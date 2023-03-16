import React, { useState, useEffect } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
    Chip,
    Grid,
    LinearProgress,
    List,
    ListItem,
    Typography,
    useTheme,
} from "@mui/material";
import Sidebar from "../../components/Sidebar.jsx";

import { getToken, removeToken } from "../../utils/localStorage/useToken.js";
import { getRole, removeRole } from "../../utils/localStorage/useRole.js";
import {
    getEntrepreneur,
    getUser,
    getEntrepreneurFromId,
    getAllEntrepreneurs,
    nameModules,
    logoutUser,
} from "../../services/user.js";

import "../../assets/scss/pages/profiles/profilEntrepreneur.scss";
import { Link, useLocation, useParams } from "react-router-dom";

function ProfilEntrepreneur({ userInfos }) {
    const { id } = useParams();

    const theme = useTheme();
    const [token, setToken] = useState(getToken());
    const [role, setRole] = useState(getRole());
    const [user, setUser] = useState(userInfos);
    const [entrepreneur, setEntrepreneur] = useState({});

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
            entrepreneur.interests = entrepreneur.theme_interesting
                .split(",")
                .slice(0, -1);
            entrepreneur.projectModules = nameModules;
            entrepreneur.projectNotes = entrepreneur.modulesValues
                .split(",")
                .map((item) => parseInt(item));
            setUser(entrepreneur);
        };
        if (id) {
            fetch();
        }
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const user = await getUser({ token: token }, role);
            const entrepreneur = await getEntrepreneur({ token: token });
            setUser({ ...user, ...entrepreneur });
        };
        fetch();
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <>
            <Typography
                variant="h4"
                sx={{
                    marginBottom: "20px",
                }}
            >
                Profil Entrepreneur
            </Typography>
            <Card
                sx={{
                    padding: "20px",
                    marginBottom: "20px",
                    borderRadius: 4,
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                }}
            >
                {user && (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "start",
                            }}
                        >
                            <Grid
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "start",
                                }}
                                container
                            >
                                <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        gap: "20px",
                                        alignItems: "start",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "start",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Avatar
                                            src={user.avatar || user.fileName}
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: 10,
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                marginX: "20px",
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                color="primary"
                                            >
                                                {user.fullName ||
                                                    user.first_name +
                                                        " " +
                                                        user.last_name}
                                            </Typography>
                                            <Typography variant="body1">
                                                {user.email}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            marginBottom: "20px",
                                            width: "100%",
                                        }}
                                    >
                                        <Typography variant="h6">
                                            A propos :
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                        >
                                            {user.description ||
                                                user.presentation}
                                        </Typography>
                                        <Typography variant="h6">
                                            Interêts
                                        </Typography>
                                        <List>
                                            {user.interests &&
                                                user.interests.map(
                                                    (interest, index) => (
                                                        <ListItem key={index}>
                                                            <Chip
                                                                color="primary"
                                                                label={interest}
                                                                sx={{
                                                                    borderRadius:
                                                                        "10px",

                                                                    "&:hover": {
                                                                        cursor: "pointer",
                                                                    },
                                                                }}
                                                            />
                                                        </ListItem>
                                                    )
                                                )}
                                        </List>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography variant="h6">
                                        Modules du projet
                                    </Typography>
                                    <List>
                                        {user.projectModules &&
                                            user.projectNotes &&
                                            user.projectModules.map(
                                                (module, index) => (
                                                    <ListItem
                                                        key={index}
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            justifyContent:
                                                                "center",
                                                            alignItems: "start",
                                                        }}
                                                    >
                                                        <Typography variant="body2">
                                                            {module}
                                                        </Typography>
                                                        {/* show module notes beautifully with a progress line*/}
                                                        <Grid
                                                            spacing={1}
                                                            container
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                                justifyContent:
                                                                    "center",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Grid xs item>
                                                                <Box>
                                                                    <LinearProgress
                                                                        value={
                                                                            user
                                                                                .projectNotes[
                                                                                index
                                                                            ]
                                                                        }
                                                                        variant="determinate"
                                                                        title="test"
                                                                    />
                                                                </Box>
                                                            </Grid>
                                                            <Grid item>
                                                                <Box>
                                                                    <Typography
                                                                        variant="body2"
                                                                        color={
                                                                            "text.secondary"
                                                                        }
                                                                    >
                                                                        {
                                                                            user
                                                                                .projectNotes[
                                                                                index
                                                                            ]
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                )
                                            )}
                                    </List>
                                    {getRole() === "expert" ||
                                        (getRole() === "admin" && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                            >
                                                <Link
                                                    to={`modules`}
                                                    style={{
                                                        textDecoration: "none",
                                                        "&:hover": {
                                                            textDecoration:
                                                                "none",
                                                        },
                                                    }}
                                                >
                                                    Voir les modules en détails
                                                </Link>
                                            </Button>
                                        ))}
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "start",
                                        alignItems: "start",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <Typography variant="h6">
                                        Votre projet
                                    </Typography>
                                    <Card
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: "20px",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "start",
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={"bold"}
                                                >
                                                    Nom du projet :
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    color="text.secondary"
                                                >
                                                    {user.projectName}
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "start",
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={"bold"}
                                                >
                                                    Description :
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    color="text.secondary"
                                                >
                                                    {user.projectDescription}
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "start",
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={"bold"}
                                                >
                                                    Thème :
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    color="text.secondary"
                                                >
                                                    {user.projectTheme}
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "start",
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={"bold"}
                                                >
                                                    Valeur :
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    color="text.secondary"
                                                >
                                                    {user.projectValue}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                )}
            </Card>
        </>
    );
}

export default ProfilEntrepreneur;
