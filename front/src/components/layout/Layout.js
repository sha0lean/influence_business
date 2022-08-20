import React from "react";
import NavBar from "../NavBar.jsx";
import '../../assets/css/style.css';

const Layout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <main>{children}</main>
        </div>
    )
}

export default Layout;