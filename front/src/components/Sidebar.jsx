import { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import { Home, Inbox, Mail } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AllInboxRoundedIcon from "@mui/icons-material/AllInboxRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { getToken, removeToken } from "../utils/localStorage/useToken.js";
import { getRole, removeRole } from "../utils/localStorage/useRole.js";
import { logout, logoutUser } from "../services/user.js";

const Sidebar = ({ handleLogout, avatar, fullName }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const [token, setToken] = useState(getToken());
    const [role, setRole] = useState(getRole());

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const drawerList = [
        {
            text: "Tableau de bord",
            icon: <DashboardRoundedIcon />,
            path: "/dashboard",
        },
        {
            text: "Messagerie",
            icon: <AllInboxRoundedIcon />,
            path: "/messagerie",
        },
        {
            text: "Documents",
            icon: <FolderRoundedIcon />,
            path: "/documents",
        },
    ];

    const user = {
        name: fullName,
        icon: avatar,
        role: getRole().toUpperCase(),
    };

    const MyDrawer = (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    mx: 1.5,
                    mt: 2,
                }}
            >
                <Box>
                    <Box sx={{ p: 2, mb: 4 }}>
                        <Typography
                            variant="h5"
                            textAlign={"center"}
                            fontWeight={"bold"}
                            textTransform={"uppercase"}
                        >
                            Influenceur Business
                        </Typography>
                    </Box>
                    <Box
                        className="flex justify-center items-center space-x-3 m-3 rounded-lg my-2 font-bold"
                        sx={{
                            backgroundColor: "action.hover",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                            borderRadius: 2,
                            my: 1,
                        }}
                    >
                        <Avatar
                            alt={user.name}
                            src={user.icon}
                            sx={{ my: 2 }}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography align="center" fontWeight={"bold"}>
                                {user.name}
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="caption"
                            >
                                {user.role}
                            </Typography>
                        </Box>
                    </Box>

                    <List
                        sx={{
                            width: 300,
                            maxWidth: "100%",
                        }}
                    >
                        {drawerList.map((item, index) => (
                            <ListItem
                                button
                                key={index}
                                component={Link}
                                to={item.path}
                                sx={{
                                    borderRadius: 2,
                                    color: theme.palette.text.primary,
                                    "&.Mui-selected": {
                                        backgroundColor:
                                            theme.palette.primary.main,
                                        color: theme.palette.primary
                                            .contrastText,
                                        "&:hover": {
                                            backgroundColor:
                                                theme.palette.primary.main,
                                            color: theme.palette.primary
                                                .contrastText,
                                        },
                                    },
                                    "&:hover": {
                                        backgroundColor:
                                            theme.palette.primary.main,
                                        color: theme.palette.primary
                                            .contrastText,
                                    },
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
            <Box sx={{ p: 2 }}>
                <Divider />
                <List>
                    <ListItem button key={"Déconnexion"} onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Déconnexion"} />
                    </ListItem>
                </List>
            </Box>
        </>
    );

    return (
        <>
            <Drawer
                sx={{
                    width: 300,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: 300,
                        boxSizing: "border-box",
                        borderWidth: 0,
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                {MyDrawer}
            </Drawer>
            <button onClick={toggleDrawer}>Open Sidebar</button>
        </>
    );
};

export default Sidebar;
