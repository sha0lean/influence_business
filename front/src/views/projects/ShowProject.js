import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar.jsx";
import { api } from "../../configApi.js";

async function fetchProject(credentials) {
    return fetch(api.url + "/getProject", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json());
}

function ShowProject({ match }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        console.log("match : ", match.params.id)
        fetchProject({
            id_project: match.params.id
        }).then((res) => {
            if (res.message === "Project found") {
                setData(res.data)
                console.log(res.data);
            }
            else {
                window.location.href = "/profilEntrepreneur"
            }
        })
    })
    return (
        <div>
            <NavBar />
            <h1>Affichage du projet</h1>
        </div>
    )
}

export default ShowProject;