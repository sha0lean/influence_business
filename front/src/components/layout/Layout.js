import React from "react";
import NavBarIntern from "../NavBarIntern.jsx";
import NavBar from "../NavBar.jsx";
import Footer from "../Footer.jsx";
import Kemi from "../Kemi.jsx";
import { getToken } from "../../utils/localStorage/useToken.js";
import { getRole } from "../../utils/localStorage/useRole.js";
const Layout = ({ children, handleThemeChange, mode }) => {
    const childrenWithProps = React.Children.map(children, (child) =>
        React.cloneElement(child, { handleThemeChange: handleThemeChange })
    );
    return (
        <div>
            <Kemi />
            {!getToken() && !getRole() && (
                <NavBar mode={mode} handleThemeChange={handleThemeChange} />
            )}
            {/*getToken() && getRole() && <NavBarIntern />*/}
            <main
                style={{
                    marginTop: getRole() && getToken() ? "0px" : "60px",
                }}
            >
                {childrenWithProps}
            </main>
            {!getToken() && !getRole() && <Footer />}
        </div>
    );
};

export default Layout;
