import React from "react";
import Table from "./Table.jsx";
import ButtonForm from "../forms/ButtonForm.jsx";
import { Link } from "react-router-dom";

function Tab1() {
    return (
        <>
            <Table />
            <div className="mx-auto w-60 pt-10">
                <Link to="/TestCreateProject">
                    <ButtonForm content={"créer un projet"} />
                </Link>
            </div>
        </>
    )
}
export default Tab1;