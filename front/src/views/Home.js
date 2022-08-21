import React from "react";
import { Link } from "react-router-dom";
import TabsRender from "../components/Tabs";
// import Tabs from "../components/Tabs";


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