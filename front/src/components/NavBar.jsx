import React, {useState} from "react";
import {
    Link
} from "react-router-dom";
import {api} from "../configApi.js";
import "../assets/scss/navBar.scss";

import {getToken,removeToken} from "../utils/localStorage/useToken.js";
import {getRole,removeRole} from "../utils/localStorage/useRole.js";


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



function NavBar(){
    const logout = async e => {
        e.preventDefault();
        
        const response = await logoutUser({
            token: getToken()
        })
        if(response.message === "The user has been disconnected"){
            removeToken()
            removeRole()
            window.location.reload().then(() => {
                setToken(getToken(null))
                setRole(getRole(null))
            });
            
        }
        else{
            alert("Mauvais identifiants")
        }
    }
    const [token,setToken] = useState(getToken())
    const [role,setRole] = useState(getRole())

    return (
        <div id="mainContainerNav">
            <div id="containerNav">
                    <nav>
                        <div id="containerPartLeftNav">
                            <div id="containerLogo">
                                <Link to="/"><img src={require("../assets/images/logo_ib.png")}  alt="logo influenceur business"/></Link>
                            </div>
                            <div id="containerLinkPartLeft">
                                <Link to="/">Accueil</Link>
                                <Link to="/contact">Contact</Link>
                                <Link to="/inscription">Inscription</Link>
                            </div>
                        </div>
                        <div id="containerButtonRegister">
                            { !token && <Link to="/connexion">Connexion</Link>}
                            { token && <Link to="/connexion" onClick={(logout)}>Deconnexion</Link> }

                        </div>
                    </nav>
                    
            </div>
        </div>
    )
}
export default NavBar;