import React from "react";
import {
    Link
} from "react-router-dom";

// import Home from "../views/Home.js"
// import AdminProfil from "../views/AdminProfil.js";

function NavBar() {
    return (
        <div id="mainContainerNav">
            <div id="containerNav">
                <nav>
                    <Link to="/">Home</Link>
                    <br />
                    <Link to="/adminProfil">profil admin</Link>
                    <br />
                    <Link to="/createProject">créatin d'un projet</Link>
                    <br />
                    <Link to="/profilEntrepreneur">profil entrepreneur</Link>
                    <br />
                    <Link to="/validateProject">validation projet</Link>
                    <br />
                    <Link to="/connexion">se connecter</Link>
                </nav>

            </div>
        </div>
    )
}
export default NavBar;