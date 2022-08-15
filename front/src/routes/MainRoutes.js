// project imports
import MainLayout from '../layouts/MainLayout.js';

// routes auth
import LoginPage from "../views/login/LoginPage.js"
import Register from "../views/login/RegisterPage.js"

// routes root
import Home from "../views/Home.js"
import Feed from "../views/Feed"

// routes profiles
import AdminProfil from "../views/profiles/AdminProfil.js"
import EntrepreneurProfil from "../views/profiles/EntrepreneurProfil.js"

// routes projects
import CreateProject from "../views/projects/CreateProject.js"
import ValidateProject from "../views/projects/ValidateProject.js"

// import Profile from "./views/Profiles/index.js"

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    // : on imbrique tout dans "MainLayout"
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: 'feed',
            element: <Feed />
        },
        {
            path: 'login',
            element: <LoginPage />
        },
        {
            path: 'register',
            element: <Register />
        },
        {
            path: 'AdminProfile',
            element: <AdminProfil />
        },
        {
            path: 'EntrepreneurProfil',
            element: <EntrepreneurProfil />
        },
        {
            path: 'createProject',
            element: <CreateProject />
        },
        {
            path: 'validateProject',
            element: <ValidateProject />
        },

    ]
};

export default MainRoutes;
