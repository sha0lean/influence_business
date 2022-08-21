// main
import Home from "../views/Home.js"
import Missing from "../views/Missing.js"

// authentification
import Login from "../views/authentification/Login.js"
import Register from "../views/authentification/Register.js";
import LoginPage from "../views/authentification/LoginPage.js"
import RegisterPage from "../views/authentification/RegisterPage.js";

// tokens
import { setToken, getToken, removeToken } from "../utils/localStorage/useToken.js";
import { setRole, getRole, removeRole } from "../utils/localStorage/useRole.js";

// route protection
import ProtectedRouteInvestor from "../utils/routesProtection/investorRoutesProtection";
import ProtectedRouteAdmin from "../utils/routesProtection/adminRoutesProtection"
import ProtectedRouteEntrepreneur from "../utils/routesProtection/entrepreneurRoutesProtection"
import ProtectedRouteAuthentification from "../utils/routesProtection/authentificationRoutesProtection"
import ProtectedRouteExpert from "../utils/routesProtection/authentificationRoutesProtection"

// profiles
import AdminProfil from "../views/admin/AdminProfil.js"
import EntrepreneurProfil from "../views/entrepreneur/EntrepreneurProfil.js"
import ExpertProfil from "../views/expert/ExpertProfil.js"
import InvestorProfil from "../views/investor/InvestorProfil.js"

// projects
import CreateProject from "../views/entrepreneur/CreateProject.js"
import ValidateProject from "../views/admin/ValidateProject.js"
import ShowProject from "../views/feed/ShowProject.js"
import ShowProjects from "../views/feed/ShowProjects.js"
import FeedComponent from "../components/FeedComponent.jsx";



let token = getToken();
const changeSetRole = (value) => {
  setRole(value);
}

const MainRoutes = {
  path: "",
  children: [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "feed",
      element: <FeedComponent />,
    },
    {
      path: "connexion",
      element: <ProtectedRouteAuthentification token={getToken()} />,
      children: [
        {
          path: "",
          element: <Login changeSetRole={changeSetRole} setToken={setToken} />
        }
      ]
    },
    {
      path: "inscription",
      element: <ProtectedRouteAuthentification token={getToken()} />,
      children: [
        {
          path: "",
          element: <Register changeSetRole={changeSetRole} setToken={setToken} />
        }
      ]
    },
    {
      path: "adminProfil",
      element: <ProtectedRouteAdmin token={getToken()} />,
      children: [
        {
          path: "",
          element: <AdminProfil getToken={getToken()} />
        }
      ]
    },
    {
      path: "profilEntrepreneur",
      element: <ProtectedRouteEntrepreneur token={getToken()} />,
      children: [
        {
          path: "",
          element: <EntrepreneurProfil />
        },
        {
          path: "creationProjet",
          element: <CreateProject getToken={getToken()} />
        },
        {
          path: "validateProject",
          element: <ValidateProject />
        },
        {
          path: "projets",
          element: <ShowProjects getToken={getToken()} />
        },
        {
          path: "projet/:id",
          element: <ShowProject getToken={getToken()} />
        }
      ]
    },
    {
      path: "profilExpert",
      element: <ProtectedRouteExpert token={getToken()} />,
      children: [
        {
          path: "",
          element: <ExpertProfil />
        }
      ]
    },
    {
      path: "profilInvestisseur",
      element: <ProtectedRouteInvestor token={getToken()} />,
      children: [
        {
          element: <InvestorProfil />
        }
      ]
    },
    {
      path: "*",
      element: <Missing />
    }

  ]
}

export default MainRoutes;