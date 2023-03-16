import React, { useState, useEffect } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../configApi.js";
// import "../assets/scss/navBar.scss";
import "../assets/scss/layout/navBar2.scss";

import { getToken, removeToken } from "../utils/localStorage/useToken.js";
import { getRole, removeRole } from "../utils/localStorage/useRole.js";
import { AppBar, Button, IconButton } from "@mui/material";
import { DarkModeRounded, LightMode } from "@mui/icons-material";

async function logoutUser(credentials) {
    return fetch(api.url + "/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}

function NavBar({ handleThemeChange, mode }) {
    // ——————————————————————————————————————————
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 1024 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
    };
    // ——————————————————————————————————————————

    const logout = async (e) => {
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
    const [token, setToken] = useState(getToken());
    const [role, setRole] = useState(getRole());

    return (
        <AppBar>
            <div className="header__content">
                <Link to="/" className="header__content__logo">
                    {/* Influenceur business */}
                </Link>
                <nav
                    className={`${"header__content__nav"} 
                    ${menuOpen && size.width < 1024 ? `${"isMenu"}` : ""} 
                    }`}
                >
                    <ul>
                        <li>
                            <Link to="/">Accueil</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>

                        <Link to="/inscription">
                            <button className="btn lato">Inscription</button>
                        </Link>
                        <Link to="/login">
                            {!token && (
                                <Link to="/connexion">
                                    <button className="btn btn__login">
                                        Connexion
                                    </button>
                                </Link>
                            )}
                            {token && (
                                <Link to="/connexion" onClick={logout}>
                                    <button className="btn btn__login">
                                        Deconnexion
                                    </button>
                                </Link>
                            )}
                        </Link>
                        <IconButton onClick={handleThemeChange}>
                            {mode === "light" ? (
                                <LightMode />
                            ) : (
                                <DarkModeRounded />
                            )}
                        </IconButton>
                    </ul>
                </nav>
                <div className="header__content__toggle">
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={menuToggleHandler} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </AppBar>
    );
}
export default NavBar;
