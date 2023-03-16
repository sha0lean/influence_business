import { Navigate, Outlet } from "react-router-dom";
import { getRole, removeRole } from "../localStorage/useRole.js";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar.jsx";
import { getEntrepreneur, getUser, logoutUser } from "../../services/user.js";
import { getToken, removeToken } from "../localStorage/useToken.js";
const ProtectedRoutesEntrepreneur = ({ token, children }) => {
    const [token2, setToken] = useState(token);
    const [role, setRole] = useState("entrepreneur");

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
            const user = await getUser({ token: token }, role);
            const entrepreneur = await getEntrepreneur({ token: token });
            setUser({ ...user, ...entrepreneur });
        };
        fetch();
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);
    if (!token || !getRole()) {
        return <Navigate to="/connexion" replace />;
    } else if (token && getRole() !== "entrepreneur") {
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
        React.cloneElement(child, { userInfos: user })
    );

    return (
        <Box>
            <Sidebar
                handleLogout={handleLogout}
                avatar={user.avatar}
                fullName={user.fullName}
                id={user.id_role}
            />
            <Box
                sx={{
                    marginLeft: "300px",
                    paddingX: "40px",
                }}
            >
                {children ? { childrenWithProps } : <Outlet />}{" "}
            </Box>
        </Box>
    );
};

export default ProtectedRoutesEntrepreneur;
