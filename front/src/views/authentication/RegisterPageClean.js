import React from "react";
import "../../assets/scss/pages/registerClean.scss";
import { Link } from "react-router-dom";
function Register() {
    return (
        <div className="register">
            <div className="register__container">
                <Link to="/inscriptionback">
                    <div className="register__title">
                        Formulaire d'inscription
                    </div>
                </Link>

                <div className="register__content">
                    <form action="#">
                        <div className="register__details">
                            <div className="input-box">
                                <span className="details">Nom</span>
                                <input
                                    type="text"
                                    placeholder="Entrez votre nom"
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Prénom</span>
                                <input
                                    type="text"
                                    placeholder="Entrez votre prénom"
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input
                                    type="text"
                                    placeholder="Entrez votre Email"
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Mot de Passe</span>
                                <input
                                    type="text"
                                    placeholder="Entrez votre Mot de Passe"
                                    required
                                />
                            </div>
                        </div>
                        <div className="role-details">
                            <input type="radio" name="role" id="dot-1" />
                            <input type="radio" name="role" id="dot-2" />
                            <input type="radio" name="role" id="dot-3" />
                            <span className="role-title">Rôle</span>
                            <div className="category">
                                <label htmlFor="dot-1">
                                    <span className="dot one"></span>
                                    <span className="role">Expert</span>
                                </label>
                                <label htmlFor="dot-2">
                                    <span className="dot two"></span>
                                    <span className="role">Entrepreneur</span>
                                </label>
                                <label htmlFor="dot-3">
                                    <span className="dot three"></span>
                                    <span className="role">Investisseur</span>
                                </label>
                            </div>
                        </div>

                        <div className="socials row center-xs around-xs">
                            <div id="containerGoogle">
                                <img
                                    src={require("../../assets/images/google.png")}
                                    alt="logo google"
                                />
                                <p className="lato">S'inscrire avec google</p>
                            </div>
                            <div id="containerLinkedin">
                                <img
                                    src={require("../../assets/images/linkedin.png")}
                                    alt="logo linkedin"
                                />
                                <p className="lato">S'inscrire avec linkedin</p>
                            </div>
                        </div>
                        <div className="button">
                            <input type="submit" value="Suivant" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
