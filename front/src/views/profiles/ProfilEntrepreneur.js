import React, { useState, useEffect } from "react";
import {
    Avatar,
    Box,
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
import { getEntrepreneur, getUser, logoutUser } from "../../services/user.js";

import "../../assets/scss/pages/profiles/profilEntrepreneur.scss";

function ProfilEntrepreneur() {
    const theme = useTheme();
    const [token, setToken] = useState(getToken());
    const [role, setRole] = useState("expert");

    const [user, setUser] = useState({});
    const [entrepreneur, setEntrepreneur] = useState({});

    const handleLogout = async (e) => {
        e.preventDefault();

        const response = await logoutUser({
            token: getToken(),
        });
        if (response.message === "The user has been disconnected") {
            removeToken();
            removeRole();
            window.location.reload().then(() => {
                setToken(getToken(null));
                setRole(getRole(null));
            });
        } else {
            alert("Mauvais identifiants");
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const user = await getUser({ token: token });
            const entrepreneur = await getEntrepreneur({ token: token });
            setUser({ ...user, ...entrepreneur });
        };
        fetch();
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <Box>
            <Sidebar
                handleLogout={handleLogout}
                avatar={user.avatar}
                fullName={user.fullName}
            />
            <Box
                sx={{
                    marginLeft: "300px",
                    paddingX: "40px",
                }}
            >
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
                                                src={user.avatar}
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
                                                    {user.fullName}
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
                                                {user.description}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="h6">
                                            Interêts
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
                                                                alignItems:
                                                                    "start",
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
                                                                    display:
                                                                        "flex",
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
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        fontWeight={"bold"}
                                                    >
                                                        Nom du projet :
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {user.projectName}
                                                    </Typography>
                                                </Box>

                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
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
                                                        {
                                                            user.projectDescription
                                                        }
                                                    </Typography>
                                                </Box>

                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
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
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
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
            </Box>
        </Box>
    );
}

export default ProfilEntrepreneur;
