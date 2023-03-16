import { Navigate, Outlet } from "react-router-dom";
import { getRole } from "../localStorage/useRole.js";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar.jsx";
import React, { useEffect, useState } from "react";

import { getToken, removeToken } from "../../utils/localStorage/useToken.js";
import { removeRole } from "../../utils/localStorage/useRole.js";
import { getExpert, getUser, logoutUser } from "../../services/user.js";
const ExpertRoutesProtection = ({ token, children }) => {
    const [token2, setToken] = useState(token);
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

    if (!token || !getRole()) {
        return <Navigate to="/connexion" replace />;
    } else if (token && getRole() !== "expert") {
        switch (getRole()) {
            case "entrepreneur":
                return <Navigate to="/profilEntrepreneur" replace />;
                break;
            case "investor":
                return <Navigate to="/profilInvestisseur" replace />;
                break;
            case "admin":
                return <Navigate to="/profilAdmin" replace />;
                break;
            default:
                return <Navigate to="/" replace />;
        }
    }
    const childrenWithProps = React.Children.map(children, (child) =>
        React.cloneElement(child, { user: user })
    );

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
                    paddingX: "20px",
                }}
            >
                {children ? { childrenWithProps } : <Outlet />}{" "}
            </Box>
        </Box>
    );
};

export default ExpertRoutesProtection;
