import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Card,
    Chip,
    Grid,
    List,
    ListItem,
    Typography,
    useTheme,
} from "@mui/material";
import Sidebar from "../../components/Sidebar.jsx";
import { getToken, removeToken } from "../../utils/localStorage/useToken.js";
import { getRole, removeRole } from "../../utils/localStorage/useRole.js";
import { getExpert, getUser, logoutUser } from "../../services/user.js";

function ProfilExpert() {
    const theme = useTheme();
    const [token, setToken] = useState(getToken());
    const [role, setRole] = useState("expert");

    const [user, setUser] = useState({});
    const [expert, setExpert] = useState({});

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
            const user = await getUser({ token: token }, role);
            const expert = await getExpert({ token: token });
            setUser({ ...user, ...expert });
        };
        fetch();
    }, []);

    useEffect(() => {}, [user]);

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
                    Profil Expert
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
                                        <Box>
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
                                    <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography variant="h6">
                                            Diplômes
                                        </Typography>
                                        <List>
                                            {user.diplomes &&
                                                user.diplomes.map(
                                                    (diplome, index) => (
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
                                                            <Typography
                                                                variant="h6"
                                                                fontWeight={
                                                                    "bold"
                                                                }
                                                            >
                                                                {diplome.ecole}
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {
                                                                    diplome.diplome
                                                                }
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {diplome.date}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                color={
                                                                    "text.secondary"
                                                                }
                                                            >
                                                                {
                                                                    diplome.description
                                                                }
                                                            </Typography>
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
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography variant="h6">
                                            Expériences
                                        </Typography>
                                        <List>
                                            {user.experiences &&
                                                user.experiences.map(
                                                    (experience, index) => (
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
                                                            <Typography
                                                                variant="h6"
                                                                fontWeight={
                                                                    "bold"
                                                                }
                                                            >
                                                                {
                                                                    experience.name
                                                                }
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                fontWeight={
                                                                    "bold"
                                                                }
                                                            >
                                                                {
                                                                    experience.position
                                                                }
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {
                                                                    experience.date
                                                                }
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                color={
                                                                    "text.secondary"
                                                                }
                                                            >
                                                                {
                                                                    experience.description
                                                                }
                                                            </Typography>
                                                        </ListItem>
                                                    )
                                                )}
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
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

export default ProfilExpert;
