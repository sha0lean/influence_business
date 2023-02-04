import axios from "axios";
const api = "http://localhost:5000";

const nameModules =
    "Renforcement personnel,Stratégie d'entreprise,Influenceur Marketing,Communication digitale et physique,Financement";
export const registerUser = async (credentials) => {
    let formData = new FormData();
    if (credentials.role === "entrepreneur") {
        formData.append("email", credentials.email);
        formData.append("password", credentials.password);
        formData.append("first_name", credentials.first_name);
        formData.append("last_name", credentials.last_name);
        formData.append("role", credentials.role);
        formData.append("file", credentials.file);
        formData.append("projectName", credentials.projectName);
        formData.append("description", credentials.description);
        formData.append("themeProject", credentials.themeProject);
        formData.append("descriptionProject", credentials.descriptionProject);
        formData.append("sensProject", credentials.sensProject);
        formData.append("value", credentials.value);
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
        formData.append(
            "selectedThemesExpert",
            credentials.selectedThemesExpert
        );
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
