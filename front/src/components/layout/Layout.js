import React from "react";
import NavBar from "components/NavBar.jsx";

const Layout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <main>
                <div className="layout mx-auto w-full sm:w-4/5 px-4 sm:px-0">
                    {children}
                </div>
            </main>

        </div>
    )
}

export default Layout;