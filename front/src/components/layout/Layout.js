import React from "react";
import NavBarIntern from "../NavBarIntern.jsx";
import NavBar from "../NavBar.jsx";
import Footer from "../Footer.jsx";
import { getToken } from "../../utils/localStorage/useToken.js";
import { getRole } from "../../utils/localStorage/useRole.js";
const Layout = ({ children }) => {
    return (
        <div>
            {!getToken() && !getRole() && <NavBar />}
            {getToken() && getRole() && <NavBarIntern />}
            <main>{children}</main>
            allo
            <Footer />
        </div>
    )
}

export default Layout;