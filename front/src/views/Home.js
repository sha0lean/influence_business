import React from "react";
import "../assets/scss/pages/home2.scss";
import "../assets/scss/comp/Modules.scss";
import ButtonForm from "../components/ButtonForm.jsx";
import ModulesShowCase from "../components/ModulesShowCase.jsx";
import abstractpurpleia from "../assets/images/abstract-IA.png";
import illubrain from "../assets/images/abstract_brain.png";
import illuentreprenor from "../assets/images/entreprenor.jpg";
import illuexpert from "../assets/images/expert.jpg";
import illuinvestor from "../assets/images/investor.jpg";
import illustaff from "../assets/images/staff.jpg";
import WordFlick from "../components/WordFlick.jsx";

function Home() {
    return (
        <container>
            <section className="landing-background">
                <div className="block calltoaction row">
                    <div className="col-md-6 col-xs-12">
                        <h1 className="calltoaction__title">
                            Un réseau d'innovation et de réussite collective.
                        </h1>
                        <br />
                        <button className="calltoaction__button center">
                            Get Started
                        </button>
                        <br />
                        <br />
                        <p className="calltoaction__subtitle">
                            <WordFlick />
                        </p>
                    </div>
                    <div className="col-md-6 calltoaction__img">
                        <img src={illubrain} alt="app" className="" />
                    </div>
                </div>
            </section>

            <section className="presentation-background">
                <div className="block presentation row around-md">
                    <h2 className="presentation__title row center-md">
                        Les maillons forts et leur point de vue.
                    </h2>

                    <div className="presentation__card">
                        <div className="card__content">
                            <div className="card__img">
                                <img src={illuentreprenor} alt="" />
                            </div>
                            <h3 className="card__title">Entrepreneur</h3>
                            <p className="card__subtitle">
                                À la recherche de nouvelles opportunités pour
                                développer son entreprise et atteindre ses
                                objectifs.
                            </p>
                            <p className="card__subtitle">
                                L'accès à des financements
                            </p>
                            <p className="card__subtitle">
                                Un accompagnement personalisé
                            </p>
                            <p className="card__subtitle">
                                La visibilité et la notoriété
                            </p>
                        </div>
                    </div>

                    <div className="presentation__card">
                        <div className="card__content">
                            <div className="card__img">
                                <img src={illuexpert} alt="" />
                            </div>
                            <h3 className="card__title">Expert</h3>
                            <p className="card__subtitle">
                                Élément clef du réseau, il apporte son expertise
                                dans un domaine spécifique à la manière d'un
                                mentor ou d'un conseiller.
                            </p>
                            <p className="card__subtitle">
                                Partager ses connaissances et son expertise
                            </p>
                            <p className="card__subtitle">
                                Nouvelles opportunités d'investissement
                            </p>
                            <p className="card__subtitle">
                                Développer son réseau
                            </p>
                        </div>
                    </div>

                    <div className="presentation__card">
                        <div className="card__content">
                            <div className="card__img">
                                <img src={illuinvestor} alt="" />
                            </div>
                            <h3 className="card__title">Investisseur</h3>
                            <p className="card__subtitle">
                                À la recherche de projets à faire éclore. Il
                                analyse leur viabilité et leur potentiel de
                                croissance.
                            </p>
                            <p className="card__subtitle">
                                Large éventail de projets
                            </p>
                            <p className="card__subtitle">
                                Echange avec le reseau
                            </p>
                            <p className="card__subtitle">
                                Suivis évolutif des projets investis
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="block presentation row around-md">
                    <h2 className="presentation__title row center-md">
                        Section 3
                    </h2>

                    <div className="presentation__card">
                        <div className="card__content">
                            <div className="card__img">
                                <img src={illustaff} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="down-background">
                <ModulesShowCase />
            </section>
        </container>
    );
}

export default Home;
