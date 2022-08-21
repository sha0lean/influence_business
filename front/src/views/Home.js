import React from "react";
import { Link } from "react-router-dom";

// profiles
import TabsRender from "../components/profiles/Tabs";


function Home() {
    return (
        <div>
            <div className="mx-auto w-2/3">
                <TabsRender />
            </div>

        </div>
    )
}

export default Home;