import React from "react";
import Card from "./Card.jsx";

function FeedComponent() {
    return (
        <div className="flex">
            <div className="mx-auto flex gap-6 flex-col mt-6">
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}
export default FeedComponent;