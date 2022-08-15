import React, { useState, useEffect} from "react";
import NavBar from "../components/NavBar.jsx";
import { getToken } from "../components/utils/useToken.js";
import {api} from "../configApi.js";
import {
    Link
} from "react-router-dom"
async function fetchProjects(credentials){
    return fetch(api.url + "/getProjects", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json());
}

function ShowProjects({getToken}){
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetchProjects({
            token: getToken
        }).then((res) => {
            if(res.message === "Project found"){
                console.log("res data : ",res.data);
                setProjects(res.data)
            }
            else{
                window.location.href = "/profilEntrepreneur"
            }
        })
    }, []);
    return(
        <div>
            <NavBar/>
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