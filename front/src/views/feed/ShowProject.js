import React, { useState, useEffect} from "react";
import NavBar from "../../components/NavBar.jsx";
import {api} from "../../configApi.js";
import { useParams } from 'react-router-dom';
import axios from "axios";
async function fetchProject(credentials){
    try{
        return await axios.post(api.url + "/getProject", credentials, {
            timeout: 2000,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
        .then(({data}) => {
            return data;
        })
    }
    catch(err){
        alert("temps de requête dépassé.");
    }
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