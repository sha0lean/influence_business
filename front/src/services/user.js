import axios from "axios";
import { getToken, removeToken } from "../utils/localStorage/useToken.js";
import { getRole, removeRole } from "../utils/localStorage/useRole.js";

const api = "http://localhost:5000";

const allEntrepreneurs = [];

export const getEntrepreneurFromId = (id) => {
    return allEntrepreneurs.find((entrepreneur) => entrepreneur.id_role === id);
};

export const nameModules = [
    "Définition du projet",
    "Analyse du projet et choix stratégique",
    "Plans opérationnels et financiers",
    "Action de développement",
];

export const registerUser = async (credentials) => {
    let formData = new FormData();
    if (credentials.role === "entrepreneur") {
        formData.append("email", credentials.email);
        formData.append("password", credentials.password);
        formData.append("first_name", credentials.first_name);
        formData.append("last_name", credentials.last_name);
        formData.append("role", credentials.role);
        formData.append("file", credentials.file);
        formData.append("theme_interesting", credentials.themeProject);
        formData.append("presentation", credentials.presentation);
        formData.append("projectName", credentials.projectName);
        formData.append("projectTheme", credentials.sensProject);
        formData.append("projectDescription", credentials.descriptionProject);
        formData.append("projectValue", credentials.value);
        formData.append("modulesValues", credentials.noteModules);
        formData.append(
            "montantInvestissement",
            credentials.montantInvestissement
        );
        formData.append("nameModules", credentials.montantInvestissement);
        formData.append("noteModules", credentials.noteModules);
    } else if (credentials.role === "investor") {
        formData.append("email", credentials.email);
        formData.append("password", credentials.password);
        formData.append("first_name", credentials.first_name);
        formData.append("last_name", credentials.last_name);
        formData.append("role", credentials.role);
        formData.append("file", credentials.file);
        formData.append("themeProject", credentials.themeProject);
        formData.append("company", credentials.company);
        formData.append("description", credentials.description);
    } else if (credentials.role === "expert") {
        formData.append("email", credentials.email);
        formData.append("password", credentials.password);
        formData.append("first_name", credentials.first_name);
        formData.append("last_name", credentials.last_name);
        formData.append("role", credentials.role);
        formData.append("file", credentials.file);
        formData.append("presentation", credentials.presentation);
        formData.append("experiences", credentials.experiences);
        formData.append("work", credentials.work);
        formData.append("diplomes", credentials.diplomes);
        formData.append("theme_interesting", credentials.theme_interesting);
    }

    try {
        return await axios
            .post(api + "/register", formData, {
                timeout: 2000,
                headers: {
                    Accept: "application/json",
                    "content-type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                return data;
            });
    } catch (err) {
        return err.response.data;
    }
};

export const logout = async (e, setToken, setRole) => {
    e.preventDefault();

    const response = await logoutUser({
        token: getToken(),
    });
    if (response.message === "The user has been disconnected") {
        removeToken();
        removeRole();
        window.location.reload().then(() => {
            setToken(getToken(null));
            setRole(getRole(null));
        });
    } else {
        alert("Mauvais identifiants");
    }
};

export async function logoutUser(credentials) {
    return fetch(api + "/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}

export const getUser = async (credentials) => {
    var userInfos = {};
    const user = await fetch(api + "/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());

    userInfos.fullName = user.first_name + " " + user.last_name;
    userInfos.email = user.email;
    userInfos.avatar = user.fileName;
    return userInfos;
};

export const getExpert = async (credentials) => {
    var userInfos = {};
    const user = await fetch(api + "/expert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) =>
        data.json().then((data) => {
            const fetchImage = async () => {
                const imageUrl = data.fileName;
                const res = await fetch(imageUrl);
                const imageBlob = await res.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);
                console.log(imageObjectURL);
                userInfos.avatar = imageObjectURL;
            };
            fetchImage();
            return data;
        })
    );

    userInfos.description = user.presentation;
    userInfos.experiences = user.experiences
        .split("|")
        .slice(0, -1)
        .map((item) => {
            const items = item.split("^").slice(0, -1);
            return {
                name: items[0],
                position: items[1],
                date: items[2] + " " + items[3],
                description: items[4],
            };
        });

    userInfos.diplomes = user.diplomes
        .split("|")
        .slice(0, -1)
        .map((item) => {
            const items = item.split("^").slice(0, -1);
            return {
                ecole: items[0],
                diplome: items[1],
                date: items[2] + " " + items[3],
                description: items[4],
            };
        });
    userInfos.interests = user.theme_interesting.split(",").slice(0, -1);
    return userInfos;
};

export const getEntrepreneur = async (credentials) => {
    var userInfos = {};
    const user = await fetch(api + "/entrepreneur", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) =>
        data.json().then((data) => {
            const fetchImage = async () => {
                const imageUrl = data.fileName;
                const res = await fetch(imageUrl);
                const imageBlob = await res.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);
                userInfos.avatar = imageObjectURL;
            };
            fetchImage();
            return data;
        })
    );
    userInfos.id_role = user.id_role;
    userInfos.description = user.presentation;
    userInfos.projectName = user.projectName;
    userInfos.projectDescription = user.projectDescription;
    userInfos.projectValue = user.projectValue;
    userInfos.projectTheme = user.projectTheme;
    userInfos.projectInvestment = user.montantInvestissement;
    userInfos.interests = user.theme_interesting.split(",").slice(0, -1);
    userInfos.projectNotes = user.modulesValues.split(",");
    userInfos.projectModules = nameModules;

    return userInfos;
};

export const getAllEntrepreneurs = async (credentials) => {
    const entrepreneurs = await fetch(api + "/entrepreneurs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
    return entrepreneurs;
};

export const getInvestisseur = async (credentials) => {
    var userInfos = {};
    const user = await fetch(api + "/investisseur", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) =>
        data.json().then((data) => {
            const fetchImage = async () => {
                const imageUrl = data.fileName;
                const res = await fetch(imageUrl);
                const imageBlob = await res.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);
                userInfos.avatar = imageObjectURL;
            };
            fetchImage();
            return data;
        })
    );
    userInfos.description = user.description;
    userInfos.company = user.name_company;
    userInfos.interests = user.theme_interesting.split(",").slice(0, -1);
    return userInfos;
};

export const addCompetence = async (credentials) => {
    const response = await fetch(api + "/addCompetence", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
    return response;
};

export const addSousCompetence = async (credentials) => {
    const response = await fetch(api + "/addSousCompetence", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
    return response;
};

export const saveSousCompetence = async (credentials) => {
    const response = await fetch(api + "/saveSousCompetence", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
    return response;
};

export const saveEntrepreneur = async (credentials) => {
    const response = await fetch(api + "/saveEntrepreneur", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
    return response;
};

export const getEntrepreneurCompetences = async (credentials) => {
    const response = await fetch(api + "/entrepreneurCompetences", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
    return response;
};

export const getEntrepreneurSousCompetences = async (credentials) => {
    const response = await fetch(api + "/entrepreneurSousCompetences", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
    return response;
};
