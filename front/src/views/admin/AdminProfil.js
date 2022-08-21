import React, { useState, useEffect } from "react";
import { api } from "/src/configApi.js";
import axios from "axios";
async function fetchProjects(credentials) {
    try {
        return await axios.post(api.url + "/getProjectsAdmin", credentials, {
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
async function validateProject(credentials) {
    return fetch(api.url + "/validateProject", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json());
}
function AdminProfil({ getToken }) {
    const [projects, setProjects] = useState([])
    useEffect(() => {
        fetchProjects({
            token: getToken
        }).then((res) => {
            if (res.message === "Projects found") {
                setProjects(res.projects)
            }
            else {
                window.location.href = "/"
            }
        })
    }, [])
    const validationProject = (event, param) => {
        validateProject({
            id_project: param,
            token: getToken
        }).then((res) => {

            if (res.message === "The project has been updated") {
                window.location.reload(false);
            }
            else {
                alert("Une erreur est survenue, veuillez réessayer");
            }
        })
    }
    return (
        <div>
            <h1>profil admin</h1>
            <div id="containerProjects">
                {projects.map((project) => (
                    <div className="projectCard" key={project.id_project}>
                        <p>{project.description}</p>
                        <p>{project.enterprise_status}</p>
                        <p>{project.advancement}</p>
                        <p>{project.motivation_IB}</p>
                        <p>{project.project_type}</p>
                        <p>{project.score}</p>
                        {project.state_validation ? <p>Le projet est validé</p> : <button onClick={event => validationProject(event, project.id_project)}>Valider</button>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminProfil;