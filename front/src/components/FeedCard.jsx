import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import moment from "moment";
import { Link, Route, Routes } from "react-router-dom";
import ProfilEntrepreneur from "../views/profiles/ProfilEntrepreneur";

const FeedCard = ({ entrepreneur }) => {
    const theme = useTheme();

    console.log(entrepreneur);

    return (
        <Card
            sx={{
                width: 345,
                width: "100%",
                backgroundColor: theme.palette.background.default,
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            borderRadius: 2,
                            my: 1,
                        }}
                    >
                        <Avatar />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography align="left" fontWeight={"bold"}>
                                {entrepreneur.first_name +
                                    " " +
                                    entrepreneur.last_name}
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="caption"
                            >
                                {entrepreneur.email}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 2,
                                }}
                            >
                                <Typography
                                    color="text.secondary"
                                    variant="caption"
                                >
                                    {moment(entrepreneur.createdAt).fromNow()}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            borderRadius: 2,
                            my: 1,
                        }}
                    >
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            A crée un nouveau projet.
                        </Typography>
                    </Box>
                    <Typography variant="body1">
                        {entrepreneur.projectName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {entrepreneur.projectDescription}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="primary"
                        sx={{
                            mt: 2,
                            caursor: "pointer",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                            alignSelf: "flex-start",
                        }}
                    >
                        <Link
                            to={{
                                pathname: `project/${entrepreneur.id_role}`,
                            }}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            Voir le projet
                        </Link>
                    </Typography>
                </Box>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            ></CardActions>
        </Card>
    );
};

export default FeedCard;
