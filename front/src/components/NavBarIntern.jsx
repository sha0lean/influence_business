import React, {useState} from "react";
import {
    Link
} from "react-router-dom";
import {api} from "../configApi.js";
import "../assets/scss/navBarIntern.scss";

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
        <div id="mainContainerNavIntern">
            <div id="containerNavIntern">
                    <nav>
                        <div id="containerPartLeftNav">
                            <div id="containerLogo">
                                <Link to="/" className="lato"><img src={require("../assets/images/logo_ib.png")}  alt="logo influenceur business"/></Link>
                            </div>
                            <div id="containerLinkPartLeft">
                                <Link to="/dashboard" className="lato">Tableau de bord</Link>

                                {getRole() === "entrepreneur" && <Link to="/profilEntrepreneur" className="lato">{getRole()}</Link>}
                                {getRole() === "expert" && <Link to="/profilExpert" className="lato">{getRole()}</Link>}
                                {getRole() === "investisseur" && <Link to="/profilInvestisseur" className="lato">{getRole()}</Link>}


                            </div>
                        </div>
                        <div id="containerPartRightNav">
                            <img src={require("../assets/images/loupe.png")}/>
                            <img src={require("../assets/images/question.png")}/>
                            <img src={require("../assets/images/profil.png")}/>
                        </div>
                    </nav>
                    
            </div>
        </div>
    )
}
export default NavBar;