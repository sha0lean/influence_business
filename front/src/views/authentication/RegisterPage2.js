import React, { useState } from "react";
import NavBar from "../../components/NavBar.jsx";
import { api } from "../../configApi.js";
import ButtonForm from "../../components/ButtonForm.jsx";
import InputField from "../../components/InputField.jsx";
import InputList from "../../components/InputList.jsx";
import UnordonedList from "../../components/UnordonedList.jsx";
import axios from "axios";
// import "../../assets/scss/pages/register.scss"
import {
    Link
} from "react-router-dom";
async function registerUser(credentials) {
    const nameModules = "Renforcement personnel,Stratégie d'entreprise,Influenceur Marketing,Communication digitale et physique,Financement"
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
        formData.append("montantInvestissement", credentials.montantInvestissement);
        formData.append("nameModules", credentials.montantInvestissement);
        formData.append("noteModules", credentials.noteModules);
    }
    else if (credentials.role === "investor") {
        formData.append("email", credentials.email);
        formData.append("password", credentials.password);
        formData.append("first_name", credentials.first_name);
        formData.append("last_name", credentials.last_name);
        formData.append("role", credentials.role);
        formData.append("file", credentials.file);
        formData.append("themeProject", credentials.themeProject);
        formData.append("company", credentials.company);
        formData.append("description", credentials.description);
    }
    else if (credentials.role === "expert") {
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
        formData.append("themeProjectExpert", credentials.themeProjectExpert);
    }

    try {
        return await axios.post(api.url + "/register", formData, {
            timeout: 2000,
            headers: {
                Accept: "application/json",
                'content-type': 'multipart/form-data',
            },
        })
            .then(({ data }) => {
                return data;
            })
    }
    catch (err) {
        return err.response.data
    }
}
function hiddenShowPassword() {
    const img = document.querySelector("#containerPassword img");
    const input = document.querySelector("#containerPassword .inputField input");
    if (input.getAttribute("type") === "password") {
        input.setAttribute("type", "text");
    }
    else {
        input.setAttribute("type", "password");

    }
}

function RegisterPage({ changeSetRole, setToken }) {
    const [errorMessage, setErrorMessage] = useState(null)
    const [email, setUserEmail] = useState(null)
    const [first_name, setUserFirstName] = useState(null)
    const [last_name, setUserLastName] = useState(null)
    const [role, setUserRole] = useState("entrepreneur")
    const [password, setUserPassword] = useState(null)
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState(null)
    const [project, setProject] = useState(null)
    const [pitchProject, setPitchProject] = useState(null)
    const [themeProject, setThemeProject] = useState([])
    const [themeProjectExpert, setThemeProjectExpert] = useState([])
    const [sensProject, setSensProject] = useState(null)
    const [proposeValue, setProposeValue] = useState(null)
    const [montantInvestissement, setMontantInvestissement] = useState(null)
    const [renforcementPersonnel, setRenforcementPersonnel] = useState(50)
    const [strategieEntreprise, setStrategieEntreprise] = useState(50)
    const [influenceurMarketing, setInfluenceurMarketing] = useState(50)
    const [communicationDigitalePhysique, setCommunicationDigitalePhysique] = useState(50)
    const [financement, setFinancement] = useState(50)
    const [presentationExpert, setPresentationExpert] = useState(null);
    const [experiencesExpert, setExperiencesExpert] = useState(null);
    const [workExpert, setWorkExpert] = useState(null);
    const [diplomesExpert, setDiplomesExpert] = useState(null);
    const [companyInvestor, setCompanyInvestor] = useState(null);
    const [descriptionInvestor, setDescriptionInvestor] = useState(null);


    const [counter, setCounter] = useState(0);
    function handleEmailChange(e) {
        setUserEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setUserPassword(e.target.value);
    }
    function handleFirstNameChange(e) {
        setUserFirstName(e.target.value);
    }
    function handleLastNameChange(e) {
        setUserLastName(e.target.value);
    }
    function handleChangeProfilPicture(event) {
        setImage(event.target.files[0]);
    }
    function showNext() {
        setCounter(counter + 1);
    }
    const handleRoleChange = async e => {
        setUserRole(e.target.innerHTML);
    }
    const handleNameProjectChange = async e => {
        setProject(e.target.value)
    }

    const handleDescriptionChange = async e => {
        setDescription(e.target.value)
    }

    const handleMontantInvestissement = async e => {
        setMontantInvestissement(e.target.value)
    }
    const handleProposeValue = async e => {
        setProposeValue(e.target.value)
    }
    const handlePresentation = async e => {
        setPresentationExpert(e.target.value);
    }
    const handleListTheme = async e => {
        let elementPresent = false
        let i = 0;
        let index = 0;
        while (i < themeProject.length) {
            if (e.target.innerHTML === themeProject[i]) {
                elementPresent = true
                i = themeProject.length;
            }
            else {
                i += 1;
                index += 1;
            }
        }

        if (!elementPresent) {
            setThemeProject([...themeProject, e.target.innerHTML])
        }
        else {
            delete themeProject[index]
        }
        /*Use Object.keys(themeProject) in order to retrieve the keys of the array without
        taking the empty slots*/
    }
    const handleListThemeExpert = async e => {
        let elementPresent = false
        let i = 0;
        let index = 0;
        while (i < themeProjectExpert.length) {
            if (e.target.innerHTML === themeProjectExpert[i]) {
                elementPresent = true
                i = themeProjectExpert.length;
            }
            else {
                i += 1;
                index += 1;
            }
        }

        if (!elementPresent) {
            //setThemeProjectExpert([...themeProjectExpert,e.target.innerHTML])
            themeProjectExpert.push(e.target.innerHTML)

        }
        else {
            delete themeProjectExpert[index]
        }
        /*Use Object.keys(themeProjectExpert) in order to retrieve the keys of the array without
        taking the empty slots*/
    }


    const handleSensProject = async e => {
        setSensProject(e.target.value)
    }

    const handlePitchProject = async e => {
        setPitchProject(e.target.value);
    }
    const handleModulePersonnel = async e => {
        setRenforcementPersonnel(e.target.value);
    }
    const handleStategieEntreprise = async e => {
        setStrategieEntreprise(e.target.value);
    }
    const handleInfluenceurMarketing = async e => {
        setInfluenceurMarketing(e.target.value);
    }
    const handleCommunicationDigitalePhysique = async e => {
        setCommunicationDigitalePhysique(e.target.value);
    }
    const handleFinancement = async e => {
        setFinancement(e.target.value);
    }

    const handleExperiencesExpert = async e => {
        setExperiencesExpert(e.target.value);
    }
    const handleWorkExpert = async e => {
        setWorkExpert(e.target.value);
    }
    const handleDiplomesExpert = async e => {
        setDiplomesExpert(e.target.value);
    }
    const handleSubmit = async e => {
        e.preventDefault();

        var response;
        if (role === "entrepreneur") {
            let themeProjectString = ""
            for (let i = 0; i < Object.keys(themeProject).length; i++) {
                if (themeProject[i]) {
                    themeProjectString += themeProject[i] + ","
                }
            }
            //We remove the last character which is ","
            themeProjectString = themeProjectString.substring(0, (themeProjectString.length) - 2)
            let noteModules = renforcementPersonnel + "," + strategieEntreprise + "," + influenceurMarketing + "," + communicationDigitalePhysique;
            response = await registerUser({
                email: email,
                password: password,
                first_name: first_name,
                last_name: last_name,
                role: role,
                file: image,
                projectName: project,
                description: description,
                themeProject: themeProjectString,
                descriptionProject: pitchProject,
                sensProject: sensProject,
                value: proposeValue,
                montantInvestissement: montantInvestissement,
                noteModules: noteModules
            })
        }
        else if (role === "investor") {
            let themeProjectString = ""
            for (let i = 0; i < Object.keys(themeProject).length; i++) {
                if (themeProject[i]) {
                    themeProjectString += themeProject[i] + ","
                }
            }
            //We remove the last character which is ","
            themeProjectString = themeProjectString.substring(0, (themeProjectString.length) - 2)
            response = await registerUser({
                email: email,
                password: password,
                first_name: first_name,
                last_name: last_name,
                role: role,
                file: image,
                themeProject: themeProjectString,
                company: companyInvestor,
                description: descriptionInvestor
            })
        }
        else if (role === "expert") {
            let themeProjectString = ""
            for (let i = 0; i < Object.keys(themeProject).length; i++) {
                if (themeProject[i]) {
                    themeProjectString += themeProject[i] + ","
                }
            }
            //We remove the last character which is ","
            themeProjectString = themeProjectString.substring(0, (themeProjectString.length) - 2)
            response = await registerUser({
                email: email,
                password: password,
                first_name: first_name,
                last_name: last_name,
                role: role,
                file: image,
                presentation: presentationExpert,
                experiences: experiencesExpert,
                work: workExpert,
                diplomes: diplomesExpert,
                themeProjectExpert: themeProjectExpert
            })
        }

        if (response.message === "Inscription valide") {

            setToken(response.token);
            changeSetRole(response.role);
            window.location.reload();
        }
        else {
            setErrorMessage(response.message)
        }


    }
    const handleCompanyInvestor = async e => {
        setCompanyInvestor(e.target.value);
    }

    const handleDescriptionInvestor = async e => {
        setDescriptionInvestor(e.target.value);
    }
    const valuesOption = ["expert", "investor", "entrepreneur"];
    const valuesTheme = ["Communication Services", "Consumer Discretionary", "Consumer Staples", "Energy", "Financials", "FinTech", "Health Care", "Industrials", "Information Technology", "Materials", "Real Estate"]
    const valuesThemeExpert = ["Renforcement personnel", "Stratégie d'entreprise", "Influenceur marketing", "Communication digitale et physique", "Financement"]

    return (

        <div class="container items-center px-5 py-12 lg:px-20">
            <form class="grid grid-cols-2 w-full p-10 px-8 pt-6 mx-auto my-6 mb-4 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-1/2 ">
                {/* NOM PROJET ——————————————————————————————————————————————————————————————————————————— */}
                <div class="relative pt-4">
                    <label for="name" class="text-base leading-7 text-blueGray-500">Nom du projet</label>
                    <input type="text" id="name" name="name" placeholder="Nom du projet" class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                </div>
                {/* DESCRIPTION ——————————————————————————————————————————————————————————————————————————— */}
                <div class="flex flex-wrap mt-4 mb-6 -mx-3">
                    <div class="w-full px-3">
                        <label class="text-base leading-7 text-blueGray-500" for="description">Parlez-nous de vous, qui vous êtes, vos expériences passées et votre ambition prochaine à travers ce projet ? </label>
                        <textarea class="w-full h-32 px-4 py-2 mt-2 text-base text-blueGray-500 transition duration-500 ease-in-out transform bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand" id="description" type="text" name="description" placeholder="Message..." required=""></textarea>
                    </div>
                </div>
                {/* UPLOAD ———————————————————————————————————————————————————————————————————————————————— */}
                <section class="flex flex-col w-full h-full p-1 overflow-auto">

                    <label for="name" class="text-base leading-7 text-blueGray-500 mb-5">
                        Téléchargez votre image :
                    </label>
                    <div class="flex flex-col items-center justify-center py-12 text-base text-blueGray-500 transition duration-500 ease-in-out transform bg-white border border-dashed rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
                        <p class="flex flex-wrap justify-center mb-3 text-base leading-7 text-blueGray-500">
                            <span>Drag and drop your</span> <span>files anywhere or</span>
                        </p>
                        <button class="w-auto px-2 py-1 my-2 mr-2 text-blueGray-500 transition duration-500 ease-in-out transform border rounded-md hover:text-blueGray-600 text-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-gray-100"> Upload a file </button>
                    </div>
                </section>
                {/* THEME MULTI BUTTON CHECKEABLE —————————————————————————————————————————————————————————— */}
                {/* PITCH —————————————————————————————————————————————————————————————————————————————————— */}
                <div class="flex flex-wrap mt-4 mb-6 -mx-3">
                    <div class="w-full px-3">
                        <label class="text-base leading-7 text-blueGray-500" for="description">Pitchez votre projet : </label>
                        <textarea class="w-full h-32 px-4 py-2 mt-2 text-base text-blueGray-500 transition duration-500 ease-in-out transform bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand" id="description" type="text" name="description" placeholder="Message..." required=""></textarea>
                    </div>
                </div>
                {/* SENS ——————————————————————————————————————————————————————————————————————————————————— */}
                <div class="flex flex-wrap mt-4 mb-6 -mx-3">
                    <div class="w-full px-3">
                        <label class="text-base leading-7 text-blueGray-500" for="description">En quoi ce projet est important pour vous ? En quoi fait-il du sens dans votre vie ? </label>
                        <textarea class="w-full h-32 px-4 py-2 mt-2 text-base text-blueGray-500 transition duration-500 ease-in-out transform bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand" id="description" type="text" name="description" placeholder="Message..." required=""></textarea>
                    </div>
                </div>
                {/* VALEUR AJOUTÉE ————————————————————————————————————————————————————————————————————————— */}
                <div class="flex flex-wrap mt-4 mb-6 -mx-3">
                    <div class="w-full px-3">
                        <label class="text-base leading-7 text-blueGray-500" for="description">Quelle est votre proposition de valeur ? </label>
                        <textarea class="w-full h-32 px-4 py-2 mt-2 text-base text-blueGray-500 transition duration-500 ease-in-out transform bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand" id="description" type="text" name="description" placeholder="Message..." required=""></textarea>
                    </div>
                </div>
                {/* INVESTISSEMENT NECESSAIRE —————————————————————————————————————————————————————————————— */}
                <div class="relative pt-4">
                    <label for="name" class="text-base leading-7 text-blueGray-500">Quel est le montant d'investissement nécessaire ?</label>
                    <input type="number" id="number" name="number" placeholder="number" class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                </div>
                {/* MODULES 1 */}
                <div class="relative pt-4">
                    <label for="name" class="text-base leading-7 text-blueGray-500">Input Range</label>
                    <input type="range" id="range" name="range" placeholder="name" class="w-full px-0 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                </div>
                {/* MODULES 2 */}
                {/* MODULES 3 */}
                {/* MODULES 4 */}
                {/* MODULES 5 */}
                {/* ——— SUBMIT ————————————————————————————————————————————————————————————————————————————— */}
                <div class="flex items-center w-full pt-4 mb-4">
                    <button class="w-full py-3 text-base text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800 "> Button </button>
                </div>
                {/* ———————————————————————————————————————————————————————————————————————————————————————— */}
            </form>
        </div>

    )
}

export default RegisterPage;