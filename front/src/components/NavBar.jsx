// import React from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../configApi.js";

import { getToken, removeToken } from "../utils/localStorage/useToken.js";
import { removeRole } from "../utils/localStorage/useRole.js";

async function logoutUser(credentials) {
    return fetch(api.url + "/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json());
}

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const logout = async e => {
        e.preventDefault();

        const response = await logoutUser({
            token: getToken()
        })
        if (response.message === "The user has been disconnected") {
            removeToken()
            removeRole()
            window.location.reload();
        }
        else {
            alert("Mauvais identifiants")
        }
    }
    return (
        <div className="sticky top-0 left-0 w-full shadow-md">
            <div className="items-center justify-between bg-white py-4 px-7 md:flex md:px-10">
                {/* LOGO TOP LEFT */}
                <div className="flex mx-4 cursor-pointer items-center justify-between font-[Poppins] text-2xl font-bold text-gray-800">
                    <a
                        href="home"
                        className="text-gray-800 duration-300 hover:text-gray-400"
                    >
                        <span className="mr-1 pt-2 text-3xl text-indigo-600">
                            <Link to="/">    Influencer Business
                            </Link>
                        </span>
                    </a>
                    {/* HAMBURGER BUTTON SPAN SVG */}
                    <span
                        onClick={() => setOpen(!open)}
                        className=" right-8 top-6 text-3xl md:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </span>
                </div>

                {/* OUVERTURE UL */}
                <ul
                    className={`left absolute z-[-1] w-full bg-white pb-12 pl-5 transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:pb-0 md:pl-0 
                        ${open
                            ? "top-20 opacity-100"
                            : "top-[-490px] md:opacity-100 opacity-0"
                        }`
                    }
                >
                    {/* MENU avec"href" obligatoires */}
                    <li className="py-2 text-xl md:my-0 md:ml-8">
                        <a href="null" className="text-gray-800 duration-300 hover:text-gray-400">
                            <Link to="/adminProfil">profil</Link>
                        </a>
                    </li>
                    <li className="py-2 text-xl md:my-0 md:ml-8">
                        <a href="null" className="text-gray-800 duration-300 hover:text-gray-400">

                            <Link to="/profilEntrepreneur/creationProjet">créer projet</Link>
                        </a>
                    </li>
                    <li className="py-2 text-xl md:my-0 md:ml-8">
                        <a href="null" className="text-gray-800 duration-300 hover:text-gray-400">
                            <Link to="/validateProject">validation</Link>
                        </a>
                    </li>
                    <button className="rounded bg-indigo-500 py-2 px-6 font-[Poppins] text-white hover:bg-indigo-700 md:ml-4">
                        <Link to="/connexion">Connexion</Link>
                    </button>
                    <button
                        className="rounded bg-indigo-500 py-2 px-6 font-[Poppins] text-white hover:bg-indigo-700 md:ml-2"
                        onClick={logout}
                    >
                        Se déconnecter
                    </button>
                </ul>
            </div>
        </div>
    );
}