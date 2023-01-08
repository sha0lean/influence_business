import React from "react";
import "../../assets/scss/pages/loginClean.scss"
import {
    Link
} from "react-router-dom";
function LoginPage() {
    return (

        <div class="login">
            <div class="login__container">
                <div class="login__title">Connexion</div>
                <div class="login__content">
                    <form action="#">
                        <div class="login__details">

                            <div class="input-box">
                                <span class="details">Email</span>
                                <input type="text" placeholder="Entrez votre Email" required />
                            </div>
                            <div class="input-box">
                                <span class="details">Mot de Passe</span>
                                <input type="text" placeholder="Entrez votre Mot de Passe" required />
                            </div>

                        </div>
                        <div class="socials row center-xs around-xs">
                            <div id="containerGoogle">
                                <img src={require("../../assets/images/google.png")} alt="logo google" />
                                <p className="lato">S'inscrire avec google</p>
                            </div>
                            <div id="containerLinkedin">
                                <img src={require("../../assets/images/linkedin.png")} alt="logo linkedin" />
                                <p className="lato">S'inscrire avec linkedin</p>
                            </div>
                        </div>
                        <div class="button">
                            <input type="submit" value="Se connecter" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;