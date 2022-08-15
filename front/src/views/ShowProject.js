import React, { useState, useEffect} from "react";
import NavBar from "../components/NavBar.jsx";
import {api} from "../configApi.js";
import { useParams} from 'react-router-dom';
async function fetchProject(credentials){
    return fetch(api.url + "/getProject", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json());
}

function ShowProject({getToken}){
    const [data, setData] = useState([]);
    const params = useParams();
    useEffect(() => {
        fetchProject({
            id_project: params.id,
            token: getToken
        }).then((res) => {
            if(res.message === "Project found"){
                setData(res)
                console.log(res);
            }
            else{
                window.location.href = "/profilEntrepreneur"
            }
        })
    },[])
    return(
        <div>
            <NavBar/>
            <h1>Affichage du projet</h1>
            <p>{data.first_name}</p>
            <p>{data.last_name}</p>
            <p>{data.email}</p>
            <p>{data.description}</p>
            <p>{data.enterprise_status}</p>
            <p>{data.advancement}</p>
            <p>{data.motivation_IB}</p>
            <p>{data.project_type}</p>
            <p>{data.state_validation ? "le projet est validé" : "Le projet est en attente de validation"}</p>







        </div>
    )
}

export default ShowProject;