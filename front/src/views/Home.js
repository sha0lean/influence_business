import React from "react";
import "../assets/scss/pages/home2.scss";
import ButtonForm from "../components/ButtonForm.jsx";

function Home() {
    return (
        <header class="call-to-action landing-background">
            <div class="row">
                <div class="col-md-6">
                    <h1>
                        Un réseau d'innovation et de réussite collective
                    </h1>
                    <p class="text-dark">
                        "We believe in the power of community to improve your business"
                    </p>
                    <button class="">
                        Get Started
                    </button>
                    <div class="my-2">
                        <p class="header-app-download-title">GET OUR MOBILE APP</p>
                    </div>
                    <div>
                        <ButtonForm content={"Nous rejoindre"} />

                        <button class="btn btn-app-download mr-2">
                            <img src="assets/images/ios.svg" alt="App store" />
                        </button>
                        <button class="btn btn-app-download">
                            <img src="assets/images/android.svg" alt="play store" />
                        </button>
                    </div>
                </div>
                <div class="col-md-6">
                    <img src="https://via.placeholder.com/400x550" alt="app" width="388px" class="img-fluid" />
                </div>
            </div>
        </header>
    )
}

export default Home;