import React from "react";
import {
    Link
} from "react-router-dom";

import Home from "../views/Home.js"
import AdminProfil from "../views/AdminProfil.js";

function NavBar(){
    return (
        <div id="mainContainerNav">
            <div id="containerNav">
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/adminProfil">profil admin</Link>
                    </nav>
            </div>
        </div>
    )
}
export default NavBar;