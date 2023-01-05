import React, {useState,useEffect} from "react";
import NavBar from "../../components/NavBar.jsx";
import {api} from "../../configApi.js";
import axios from "axios";
import "../../assets/scss/profilEntrepreneur.scss"
import {
    Link
} from "react-router-dom";

function ProfilEntrepreneur(token){
    const [profilPicture,setPictureProfil] = useState(null)

    useEffect(() => {
        axios.post(api.url + "/getProfilPicture",{"token":token.token}, {
            timeout: 2000,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
        }).then((response) => {
            console.log("picture : ",response.data.profilPicture);
            setPictureProfil(response.data.profilPicture);
        })
    }, []);
    return(
        <div id="mainContainerProfilEntrepreneur">
            <h1>Page profil entrepreneur</h1>
        </div>

    )

    
}

export default ProfilEntrepreneur