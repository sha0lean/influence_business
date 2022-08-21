import React from "react";
import { Link } from "react-router-dom";

// profiles
import TabsRender from "../components/profiles/Tabs.jsx";


function Home() {
    return (
        <div>
            <div className="">
                <TabsRender />
            </div>

        </div>
    )
}

export default Home;