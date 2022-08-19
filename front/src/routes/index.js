import * as React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../views/Home.js";
import MainRoutes from "./MainRoutes";
export default function ThemeRoutes(){
    return useRoutes([
        MainRoutes
    ])
}