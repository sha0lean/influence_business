import React, { useState, useEffect } from "react";
import { api } from "../../configApi.js";
import {
    Link
} from "react-router-dom"
import axios from "axios"

async function fetchProjects(credentials) {
    try {
        return await axios.post(api.url + "/getProjects", credentials, {
            timeout: 2000,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
            .then(({ data }) => {
                return data;
            })
    }
    catch (err) {
        alert("temps de requête dépassé.");
    }
}

function ShowProjects({ getToken }) {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetchProjects({
            token: getToken
        }).then((res) => {
            if (res.message === "Project found") {
                console.log("res data : ", res.data);
                setProjects(res.data)
            }
            else {
                window.location.href = "/profilEntrepreneur"
            }
        })
    }, []);
    return (
        <div>
            <h1>Affichage des projets</h1>
            <div id="containerProjects">
                {projects.map((project) => (
                    <div className="projectCard" key={project.id_project}>
                        <p>{project.description}</p>
                        <p>{project.enterprise_status}</p>
                        <p>{project.advancement}</p>
                        <p>{project.advancement}</p>
                        <p>{project.motivation_IB}</p>
                        <p>{project.project_type}</p>
                        <p>{project.score}</p>
                        <Link to={`/projet/${project.id_project}`}>Afficher le projet</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowProjects;