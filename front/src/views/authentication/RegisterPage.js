import React, { useState } from "react";
import NavBar from "../../components/NavBar.jsx";
import { api } from "../../configApi.js";
import ButtonForm from "../../components/ButtonForm.jsx";
import InputField from "../../components/InputField.jsx";
import InputList from "../../components/InputList.jsx";
import UnordonedList from "../../components/UnordonedList.jsx";
import axios from "axios";
import "../../assets/scss/pages/register.scss"
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
        <div id="mainContainerRegister">
            <h1 className="lato">Formulaire d'inscription</h1>
            <div id="registerContainer">
                <form id="containerFormRegister" onSubmit={handleSubmit}>
                    {counter == 0 &&
                        <div>
                            <div id="containerFirstLastName">
                                <div id="containerFirstName">
                                    <InputField label={"Prénom"} name={"firstname"} type={"text"} placeholder={"Prénom"} idName={"inputField-first-name"} onChange={handleFirstNameChange} />
                                </div>
                                <div id="containerLastName">
                                    <InputField label={"Nom"} name={"lastname"} type={"text"} placeholder={"Nom"} idName={"inputField-last-name"} onChange={handleLastNameChange} />
                                </div>
                            </div>
                            <div id="containerEmailPassword">
                                <div id="containerEmail">
                                    <InputField label={"Adresse mail"} name={"email"} type={"email"} placeholder={"Adresse mail"} idName={"inputField-email"} onChange={handleEmailChange} />
                                </div>
                                <div id="containerPassword">
                                    <img src={require("../../assets/images/oeil.png")} alt="logo oeil" onMouseDown={(hiddenShowPassword)} onMouseUp={(hiddenShowPassword)} />
                                    <InputField label={"Mot de passe"} name={"password"} type={"password"} placeholder={"Mot de passe"} idName={"inputField-password"} onChange={handlePasswordChange} />
                                </div>
                            </div>
                            <div id="containerInputList">
                                <p className="lato">Quelle est votre position au sein d'influenceur business</p>
                                <InputList type={"radio"} name={"inputList-role"} valuesOption={valuesOption} onClick={handleRoleChange} />
                            </div>
                            <p id="buttonNext" onClick={showNext}>Suivant</p>
                        </div>

                    }
                    {counter == 1 && role === "entrepreneur" &&
                        <div>
                            <div id="containerNameProject">
                                <InputField label={"Comment s'appelle votre projet ?"} name={"nomProject"} type={"text"} placeholder={"Nom du projet"} idName={"inputField-name-project"} onChange={handleNameProjectChange} />
                            </div>
                            <div id="containerDescriptionProject">
                                <InputField label={"Parlez-nous de vous, qui vous êtes, vos expériences passées et votre ambition prochaine à travers ce projet ?"} name={"description"} type={"textarea"} placeholder={"Description"} idName={"inputField-description"} onChange={handleDescriptionChange} />
                            </div>
                            <div id="containerInputProfilImage">
                                <label className="lato">Photo de profil</label>
                                <input type="file" name="file" id="input-file" onChange={handleChangeProfilPicture} />
                            </div>
                            <div id="containerThemeProject">
                                <p>Quel est le thème de votre projet ?</p>
                                <UnordonedList valuesOption={valuesTheme} onClick={handleListTheme} />
                            </div>
                            <div id="containerLeftPresentationProject">
                                <div id="containerPitch">
                                    <InputField label={"Pitchez-nous votre projet"} name={"pitchProject"} type={"textarea"} placeholder={"Description du projet"} idName={"inputField-pitch-project"} onChange={handlePitchProject} />
                                </div>
                                <div id="containerImportantProject">
                                    <InputField label={"En quoi ce projet est important pour vous ? En quoi fait-il du sens dans votre vie ?"} name={"importantProject"} type={"textarea"} placeholder={"Un projet qui a du sens"} idName={"inputField-pitch-project"} onChange={handleSensProject} />
                                </div>
                                <div id="containerProposeValue">
                                    <InputField label={"Quelle est votre proposition de valeur ?"} name={"value"} type={"textarea"} placeholder={"Proposition de valeur"} idName={"inputField-propose-value"} onChange={handleProposeValue} />
                                </div>
                                <div id="containerMontantInvest">
                                    <InputField label={"Quel est le montant d'investissement nécessaire ?"} name={"investissement"} type={"text"} placeholder={"Montant d'investissement"} idName={"inputField-montant-investissement"} onChange={handleMontantInvestissement} />
                                </div>
                            </div>
                            <div id="containerModules">
                                <div id="containerSlidersModules">
                                    <p className="lato">Sur une échelle de 0 à 100, comment vous placeriez-vous sur ces modules ?</p>
                                    <div>
                                        <label for="renforcement-personnel">Renforcement personnel</label>
                                        <input type="range" id="renforcement-personnel" name="renforcement-personnel"
                                            min="0" max="100" step="1" onChange={handleModulePersonnel} />
                                        <p className="lato">{renforcementPersonnel}</p>
                                    </div>
                                    <div>
                                        <label for="strategie-entreprise">Stratégie d'entreprise</label>
                                        <input type="range" id="strategie-entreprise" name="strategie-entreprise"
                                            min="0" max="100" step="1" onChange={handleStategieEntreprise} />
                                        <p className="lato">{strategieEntreprise}</p>
                                    </div>
                                    <div>
                                        <label for="influenceur-marketing">Influenceur Marketing</label>
                                        <input type="range" id="influenceur-marketing" name="influenceur-marketing"
                                            min="0" max="100" step="1" onChange={handleInfluenceurMarketing} />
                                        <p className="lato">{influenceurMarketing}</p>
                                    </div>
                                    <div>
                                        <label for="communication-digitale-physique">Communication digitale et physique</label>
                                        <input type="range" id="communication-digitale-physique" name="communication-digitale-physique"
                                            min="0" max="100" step="1" onChange={handleCommunicationDigitalePhysique} />
                                        <p className="lato">{communicationDigitalePhysique}</p>
                                    </div>
                                    <div>
                                        <label for="financement">Financement</label>
                                        <input type="range" id="financement" name="financement"
                                            min="0" max="100" step="1" onChange={handleFinancement} />
                                        <p className="lato">{financement}</p>
                                    </div>
                                </div>
                            </div>
                            <ButtonForm content={"S'inscrire"} />
                        </div>
                    }
                    {counter === 1 && role === "expert" &&
                        <div>
                            <div id="containerPresentation">
                                <InputField label={"Qui êtes vous ?"} name={"identite"} type={"textarea"} placeholder={"Présentez-vous"} idName={"inputField-presentation"} onChange={handlePresentation} />
                            </div>
                            <div id="containerThemeProjectExpert">
                                <p>Quel est le thème de votre projet ?</p>
                                <UnordonedList valuesOption={valuesThemeExpert} onClick={handleListThemeExpert} />
                            </div>
                            <div id="containerInputProfilImageExpert">
                                <label className="lato">Photo de profil</label>
                                <input type="file" name="file" id="input-file-expert" onChange={handleChangeProfilPicture} />
                            </div>
                            <div id="containerExperiencesExpert">
                                <InputField label={"Présentez vos expérience?"} name={"indentityExpert"} type={"textarea"} placeholder={"Présentez-vous"} idName={"inputField-experiences-expert"} onChange={handleExperiencesExpert} />
                            </div>
                            <div id="containerDiplomesExpert">
                                <InputField label={"Présentez vos diplomes"} name={"diplomesExpert"} type={"textarea"} placeholder={"Vos diplomes"} idName={"inputField-diplomes-expert"} onChange={handleDiplomesExpert} />
                            </div>
                            <div id="containerActualWork">
                                <InputField label={"Présentez votre travail"} name={"workExpert"} type={"textarea"} placeholder={"Votre travail"} idName={"inputField-work-expert"} onChange={handleWorkExpert} />
                            </div>
                            <ButtonForm content={"S'inscrire"} />
                        </div>
                    }
                    {counter === 1 && role === "investor" &&
                        <div>
                            <div id="containerLeftInvestor">
                                <div id="containerNameCompany">
                                    <InputField label={"Comment s'appelle votre organisation ?"} name={"companyInvestor"} type={"text"} placeholder={"Votre organisation"} idName={"inputField-company-investor"} onChange={handleCompanyInvestor} />
                                </div>
                                <div id="containerInputProfilImageInvestor">
                                    <label className="lato">Photo de profil</label>
                                    <input type="file" name="file" id="input-file-investor" onChange={handleChangeProfilPicture} />
                                </div>
                                <div id="containerNameCompany">
                                    <InputField label={"Parlez-nous de vous, qui vous êtes, vos expériences passées et votre ambition prochaine à IB ?"} name={"descriptionInvestor"} type={"textarea"} placeholder={"Description"} idName={"inputField-description-investor"} onChange={handleDescriptionInvestor} />
                                </div>
                            </div>
                            <div id="containerRightInvestor">
                                <div id="containerThemeProjectInvestor">
                                    <p>Quel thème vous intéresse ?</p>
                                    <UnordonedList valuesOption={valuesTheme} onClick={handleListTheme} />
                                </div>
                            </div>
                            <ButtonForm content={"S'inscrire"} />
                        </div>
                    }
                    {errorMessage && <p className="lato" id="errorMessage">{errorMessage}</p>}
                    {/*
                    <div id="containerDemarcation">
                        <hr/>
                        <p className="lato">OU</p>
                    </div>
                    
                    <div id="containerGoogle">
                        <img src={require("../../assets/images/google.png")} alt="logo google"/>
                        <p className="lato">S'inscrire avec google</p>
                    </div>
                    <div id="containerLinkedin">
                        <img src={require("../../assets/images/linkedin.png")} alt="logo linkedin"/>
                        <p className="lato">S'inscrire avec linkedin</p>
                    </div> */}

                </form>
            </div>
        </div>
    )
}

export default RegisterPage;