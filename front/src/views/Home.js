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

function Home() {
    return (
        <container>

            <section class="landing-background">
                <div class="block calltoaction row">
                    <div class="col-md-6 col-xs-12">
                        <h1 class="calltoaction__title">
                            Un réseau d'innovation <br />
                            et de réussite collective.
                        </h1>
                        <p class="calltoaction__subtitle">
                            "We believe in the power of community <br />
                            to improve your business."
                        </p>
                        <button class="calltoaction__button center">
                            Get Started
                        </button>
                    </div>
                    <div class="col-md-6 calltoaction__img">
                        <img src={illubrain} alt="app" class="" />
                    </div>
                </div>
            </section>



            <section class="presentation-background">
                <div class="block presentation row around-md">
                    <h2 class="presentation__title row center-md">
                        Les maillons forts et leur point de vue.
                    </h2>

                    <div class="presentation__card">
                        <div class="card__content">
                            <div class="card__img">
                                <img src={illuentreprenor} alt="" />
                            </div>
                            <h3 class="card__title">
                                Entrepreneur
                            </h3>
                            <p class="card__subtitle">
                                À la recherche de nouvelles opportunités pour développer son entreprise et atteindre ses objectifs.
                            </p>
                            <p class="card__subtitle">
                                L'accès à des financements
                            </p>
                            <p class="card__subtitle">
                                Un accompagnement personalisé
                            </p>
                            <p class="card__subtitle">
                                La visibilité et la notoriété
                            </p>
                        </div>
                    </div>

                    <div class="presentation__card">
                        <div class="card__content">
                            <div class="card__img">
                                <img src={illuexpert} alt="" />
                            </div>
                            <h3 class="card__title">
                                Expert
                            </h3>
                            <p class="card__subtitle">
                                Élément clef du réseau, il apporte son expertise dans un domaine spécifique à la manière d'un mentor ou d'un conseiller.
                            </p>
                            <p class="card__subtitle">
                                Partager ses connaissances et son expertise
                            </p>
                            <p class="card__subtitle">
                                Nouvelles opportunités d'investissement
                            </p>
                            <p class="card__subtitle">
                                Développer son réseau
                            </p>
                        </div>
                    </div>

                    <div class="presentation__card">
                        <div class="card__content">
                            <div class="card__img">
                                <img src={illuinvestor} alt="" />
                            </div>
                            <h3 class="card__title">
                                Investisseur
                            </h3>
                            <p class="card__subtitle">
                                À la recherche de projets à faire éclore. Il analyse leur viabilité et leur potentiel de croissance.
                            </p>
                            <p class="card__subtitle">
                                Large éventail de projets
                            </p>
                            <p class="card__subtitle">
                                Echange avec le reseau
                            </p>
                            <p class="card__subtitle">
                                Suivis évolutif des projets investis
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section>
                <div class="block presentation row around-md">
                    <h2 class="presentation__title row center-md">
                        Section 3
                    </h2>

                    <div class="presentation__card">
                        <div class="card__content">
                            <div class="card__img">
                                <img src={illustaff} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section class="down-background">
                <ModulesShowCase />
            </section>

        </container>
    )
}

export default Home;