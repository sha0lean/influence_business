// project imports
import MainLayout from 'layout/MainLayout';

// routes auth
import LoginPage from "./views/LoginPage.js"
import Register from "./views/RegisterPage.js"

// routes root
import Home from "./views/Home.js"
import Feed from "./views/Feed"

// routes profiles
import AdminProfile from "./views/Profile/AdminProfile.js"
import EntrepreneurProfil from "./views/Profile/EntrepreneurProfil.js"

// routes projects
import CreateProject from "./views/CreateProject.js"
import ValidateProject from "./views/ValidateProject.js"

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
            element: <AdminProfile />
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
        {
            path: 'AdminProfile',
            element: <AdminProfile />
        },
    ]
};

export default MainRoutes;
