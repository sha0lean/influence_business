import React from "react";
import { Link } from "react-router-dom";
import "../../assets/scss/pages/loginClean.scss";

function LoginPage() {
    return (
        <div className="login">
            <div className="login__container">
                <Link to="/connexionback">
                    <div className="login__title">Connexion</div>
                </Link>
                <div className="login__content">
                    <form action="#">
                        <div className="login__details">
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input
                                    type="text"
                                    placeholder="Entrez votre Email"
                                />
                                {/* <input type="text" placeholder="Entrez votre Email" required /> */}
                            </div>
                            <div className="input-box">
                                <span className="details">Mot de Passe</span>
                                <input
                                    type="text"
                                    placeholder="Entrez votre Mot de Passe"
                                />
                                {/* <input type="text" placeholder="Entrez votre Mot de Passe" required /> */}
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
                            <input type="submit" value="Se connecter" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
