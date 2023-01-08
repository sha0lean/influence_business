import React from "react";
import "../assets/scss/pages/home2.scss";
import ButtonForm from "../components/ButtonForm.jsx";
import abstractpurpleia from "../assets/images/abstract-IA.png";
import illubrain from "../assets/images/abstract_brain.png";

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
            <section class="">
                <div class="block">
                    section 2
                </div>
            </section>
        </container>
    )
}

export default Home;