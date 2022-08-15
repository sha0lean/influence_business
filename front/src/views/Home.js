import React from "react";
import NavBar from "../components/NavBar.jsx";
import Navigation from "../components/Navigation.jsx";

function Home() {
    return (
        <div>
            <Navigation />
            <NavBar />
            <h1>Home Office</h1>
        </div>
    )
}

export default Home;