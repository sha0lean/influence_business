import {
    Avatar,
    Box,
    Card,
    CardActions,
    IconButton,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import FeedCard from "../components/FeedCard";
import { getRole } from "../utils/localStorage/useRole";
import { Comment } from "@mui/icons-material";
import { BiLike } from "react-icons/bi";
import { getAllEntrepreneurs } from "../services/user";
import { getToken } from "../utils/localStorage/useToken";

const Feed = ({ user }) => {
    const theme = useTheme();
    const [entrepreneurs, setEntrepreneurs] = React.useState([]);

    useEffect(() => {
        const fetch = async () => {
            const entrepreneurs = await getAllEntrepreneurs({
                token: getToken(),
            });
            setEntrepreneurs(entrepreneurs);
        };
        fetch();
    }, []);

    useEffect(() => {
        console.log(entrepreneurs);
    }, [entrepreneurs]);

    return (
        <>
            <Typography variant="h4" sx={{ margin: "1rem" }}>
                Actualités
            </Typography>

            <Card
                sx={{
                    width: "100%",
                    backgroundColor: theme.palette.background.paper,
                    minHeight: "100vh",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            padding: "1rem",
                        }}
                    >
                        <Avatar alt={"test"} sx={{ my: 2 }} />

                        <TextField
                            size="large"
                            fullWidth
                            placeholder="Qu'est ce qu'il y a de nouveau ?"
                            sx={{
                                margin: "1rem",
                                width: "100%",
                                backgroundColor:
                                    theme.palette.background.default,
                            }}
                        />
                    </Box>
                    <CardActions
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "start",
                            width: "100%",
                            gap: 1,
                        }}
                    >
                        <IconButton aria-label="like">
                            <BiLike />
                        </IconButton>
                        <IconButton aria-label="comment">
                            <Comment />
                        </IconButton>
                    </CardActions>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column-reverse",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        gap: 2,
                    }}
                >
                    {entrepreneurs.map((entrepreneur, index) => (
                        <FeedCard key={index} entrepreneur={entrepreneur} />
                    ))}
                </Box>
            </Card>
        </>
    );
};

export default Feed;
