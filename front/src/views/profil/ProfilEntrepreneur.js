import React, {useState} from "react";
import NavBar from "../../components/NavBar.jsx";
import {api} from "../../configApi.js";
import axios from "axios";
import "../../assets/scss/profilEntrepreneur.scss"
import {
    Link
} from "react-router-dom";

function ProfilEntrepreneur(){
    return(
        <div id="mainContainerProfilEntrepreneur">
            <h1>Page profil entrepreneur</h1>
        </div>

    )
}

export default ProfilEntrepreneur