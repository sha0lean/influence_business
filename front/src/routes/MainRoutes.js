import Home from "../views/Home.js"
import AdminProfil from "../views/admin/AdminProfil.js"
import CreateProject from "../views/entrepreneur/CreateProject.js"
import EntrepreneurProfil from "../views/entrepreneur/EntrepreneurProfil.js"
import ValidateProject from "../views/admin/ValidateProject.js"
import LoginPage from "../views/authentification/LoginPage.js"
import RegisterPage from "../views/authentification/RegisterPage.js";
import Missing from "../views/Missing.js"
import ExpertProfil from "../views/expert/ExpertProfil.js"
import InvestorProfil from "../views/investor/InvestorProfil.js"
import ShowProject from "../views/feed/ShowProject.js"
import ShowProjects from "../views/feed/ShowProjects.js"
import MainLayout from "../layout/MainLayout.js"
import { setToken, getToken, removeToken } from "../utils/localStorage/useToken.js";
import { setRole, getRole, removeRole } from "../utils/localStorage/useRole.js";
import ProtectedRouteInvestor from "../utils/routesProtection/investorRoutesProtection";
import ProtectedRouteAdmin from "../utils/routesProtection/adminRoutesProtection"
import ProtectedRouteEntrepreneur from "../utils/routesProtection/entrepreneurRoutesProtection"
import ProtectedRouteAuthentification from "../utils/routesProtection/authentificationRoutesProtection"
import ProtectedRouteExpert from "../utils/routesProtection/authentificationRoutesProtection"
let token = getToken();
const changeSetRole = (value) => {
  setRole(value);
}

const MainRoutes = {
  path: "",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "connexion",
      element: <ProtectedRouteAuthentification token={getToken()} />,
      children: [
        {
          path: "",
          element: <LoginPage changeSetRole={changeSetRole} setToken={setToken} />
        }
      ]
    },
    {
      path: "inscription",
      element: <ProtectedRouteAuthentification token={getToken()} />,
      children: [
        {
          path: "",
          element: <RegisterPage changeSetRole={changeSetRole} setToken={setToken} />
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