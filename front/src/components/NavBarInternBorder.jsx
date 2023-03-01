import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { api } from "../configApi.js";

import { getToken, removeToken } from "../utils/localStorage/useToken.js";
import { getRole, removeRole } from "../utils/localStorage/useRole.js";

async function logoutUser(credentials) {
    return fetch(api.url + "/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}

function NavBarInternBorder() {
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
    const [profilPicture, setPictureProfil] = useState(null);
    const [username, setUsername] = useState(null);
    const [nameSliders, setNameSliders] = useState(null);
    const [noteSliders, setNoteSliders] = useState(null);

    useEffect(() => {
        axios
            .post(
                api.url + "/getProfilPicture",
                { token: token },
                {
                    timeout: 2000,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                }
            )
            .then((response) => {
                console.log("picture : ", response.data.profilPicture);
                setPictureProfil(response.data.profilPicture);
            });
        axios
            .post(
                api.url + "/getUsername",
                { token: token },
                {
                    timeout: 2000,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                }
            )
            .then((response) => {
                console.log("response : ", response.data.username);
                setUsername(response.data.username);
            });

        axios
            .post(
                api.url + "/getModules",
                { token: token },
                {
                    timeout: 2000,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                }
            )
            .then((response) => {
                console.log("reponse : ", response.data);
                setNameSliders(response.data.name_sliders);
                setNoteSliders(response.data.sliders);
            });
    }, []);

    return (
        <div id="mainContainerNavInternBorder">
            <div id="containerNavInternBorder">
                <nav>
                    <img
                        src={`http://localhost:5000/uploads/${profilPicture}`}
                        alt="profil picture"
                    />
                    <h2>{username}</h2>
                    {role === "entrepreneur" && (
                        <div className="containerButtonDashboard">
                            <Link to="/profilEntrepreneur">
                                Tableau de bord
                            </Link>
                        </div>
                    )}
                    {role === "expert" && (
                        <div className="containerButtonDashboard">
                            <Link to="/profilExpert">Tableau de bord</Link>
                        </div>
                    )}
                    {role === "investor" && (
                        <div className="containerButtonDashboard">
                            <Link to="/profilInvestor">Tableau de bord</Link>
                        </div>
                    )}
                    <div id="containerNotification">
                        <p>Notifications</p>
                    </div>
                    <div id="containerMessagerie">
                        <p>Messagerie</p>
                    </div>
                    <div id="containerFiles">
                        <p>Documents</p>
                    </div>
                    <div id="containerSliders">
                        <p>{nameSliders}</p>
                    </div>
                    <div id="containerNoteSliders">
                        <p>{noteSliders}</p>
                    </div>
                </nav>
            </div>
        </div>
    );
}
export default NavBarInternBorder;
