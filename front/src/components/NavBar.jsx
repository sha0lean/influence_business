import React from "react";
import {
    Link
} from "react-router-dom";
import {api} from "../configApi.js";


import {getToken,removeToken} from "../utils/localStorage/useToken.js";
import {removeRole} from "../utils/localStorage/useRole.js";

/*
async function logoutUser(credentials){
    return fetch(api.url + "/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json());
}
*/


function NavBar(){
    /*
    const logout = async e => {
        e.preventDefault();
        
        const response = await logoutUser({
            token: getToken()
        })
        if(response.message === "The user has been disconnected"){
            removeToken()
            removeRole()
            window.location.reload();
        }
        else{
            alert("Mauvais identifiants")
        }
    }
    */
    return (
        <div id="mainContainerNav">
            <div id="containerNav">
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/adminProfil">profil admin</Link>
                        <Link to="/profilEntrepreneur/creationProjet">créatin d'un projet</Link>
                        <Link to="/profilEntrepreneur">profil entrepreneur</Link>
                        <Link to="/validateProject">validation projet</Link>
                        <Link to="/connexion">se connecter</Link>
                    </nav>
                    
            </div>
        </div>
    )
}
export default NavBar;