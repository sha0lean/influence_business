import React from "react";
// import "../../assets/scss/pages/register.scss"
import "../../assets/scss/pages/registerEZ.scss"
import {
    Link
} from "react-router-dom";
function Register() {
    return (

        <div class="register">
            <div class="register__container">
                <div class="register__title">Formulaire d'inscription</div>
                <div class="register__content">
                    <form action="#">
                        <div class="register__details">
                            <div class="input-box">
                                <span class="details">Nom</span>
                                <input type="text" placeholder="Entrez votre nom" required />
                            </div>
                            <div class="input-box">
                                <span class="details">Prénom</span>
                                <input type="text" placeholder="Entrez votre prénom" required />
                            </div>
                            <div class="input-box">
                                <span class="details">Email</span>
                                <input type="text" placeholder="Entrez votre Email" required />
                            </div>
                            <div class="input-box">
                                <span class="details">Mot de Passe</span>
                                <input type="text" placeholder="Entrez votre Mot de Passe" required />
                            </div>

                        </div>
                        <div class="gender-details">
                            <input type="radio" name="gender" id="dot-1" />
                            <input type="radio" name="gender" id="dot-2" />
                            <input type="radio" name="gender" id="dot-3" />
                            <span class="gender-title">Genre</span>
                            <div class="category">
                                <label for="dot-1">
                                    <span class="dot one"></span>
                                    <span class="gender">Homme</span>
                                </label>
                                <label for="dot-2">
                                    <span class="dot two"></span>
                                    <span class="gender">Femme</span>
                                </label>
                                <label for="dot-3">
                                    <span class="dot three"></span>
                                    <span class="gender">Je ne le préciserais pas</span>
                                </label>
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
                            <input type="submit" value="Suivant" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;