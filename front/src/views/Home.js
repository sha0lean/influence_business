import React from "react";
import "../assets/scss/home.scss"
import {
    Link
} from "react-router-dom";
function Home() {
    return (
        <div id="mainContainerHome">
            <div id="containerBgImage">
                <img src={require("../assets/images/bg_home.png")} alt="background image home" />
            </div>
            <div id="containerTitleLogo">
                <img src={require("../assets/images/logo_ib.png")} alt="logo influenceur business" />
                <div id="containerTitle">
                    <h1 className="lato">Influenceur business</h1>
                    <h3 className="lato">There is no way you can't trust us.</h3>
                    <Link to="/inscription"><button className="lato">Join us</button></Link>
                </div>
            </div>
            <div id="containerSubject">
                <div>
                    <img src={require("../assets/images/choice_subject.png")} alt="choix du sujet" />
                </div>
                <div>
                    <img src={require("../assets/images/modules.png")} alt="choix des modules" />
                </div>
                <div>
                    <img src={require("../assets/images/organizational_intelligence.png")} alt="organisation" />
                </div>
            </div>
        </div>
    )
}

export default Home;