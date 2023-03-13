import "./App.css";
import React, { useMemo } from "react";
import Layout from "./components/layout/Layout.js";
import "../node_modules/@drewbot/sass-flexbox-grid/public/sass-flexbox/main.min.css";
import Routes from "./routes";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const App = () => {
    const [mode, setMode] = React.useState("dark");

    const handleThemeChange = () => {
        setMode(mode === "dark" ? "light" : "dark");
    };

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode,
                primary: {
                    main: "#a2a2f6",
                },
                secondary: {
                    main: "#F2F2F2",
                },
                background: {
                    default: mode === "dark" ? "#272127" : "#F2F2F2",
                    paper: mode === "dark" ? "#161216" : "#F2F2F2",
                },
                text: {
                    primary: mode === "dark" ? "#F2F2F2" : "#1E1E1E",
                },
            },

            components: {
                MuiButton: {
                    styleOverrides: {
                        root: {
                            textTransform: "none",
                        },
                    },
                },

                MuiDrawer: {
                    styleOverrides: {
                        paper: {
                            backgroundColor:
                                mode === "dark" ? "#161216" : "#eee",
                        },
                    },
                },
            },
        })
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <Layout mode={mode} handleThemeChange={handleThemeChange}>
                    <Routes />
                </Layout>
            </div>
        </ThemeProvider>
    );
};

export default App;
