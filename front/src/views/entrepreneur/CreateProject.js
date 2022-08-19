import React, {useState} from "react";
import {api} from "../../configApi.js";
import ButtonForm from "../../components/ButtonForm.jsx";
import InputField from "../../components/InputField.jsx";
import CheckBox from "../../components/CheckBox.jsx";
import Radio from "../../components/Radio.jsx";
import Slider from "../../components/Slider.jsx";
import axios from "axios";
async function createProjectEntrepreneur(credentials){
    try{
        return await axios.post(api.url + "/createProject", credentials, {
            timeout: 2000,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
        .then(({data}) => {
            return data;
        })
    }
    catch(err){
        alert("temps de requête dépassé.");
    }
}

function CreateProject({getToken}){
    const [sliders,setSliders] = useState(null)
    const [project_type,setProjectType] = useState(null)
    const [enterprise_status,setEnterpriseStatus] = useState(null)
    const [advancement,setAdvancement] = useState(null)
    const [motivation_IB,setMotivationIB] = useState(null)
    const [description,setDescription] = useState(null)
    const [valueSliders,setValueSliders] = useState([0,0]);
    function handleSlidersChange(event){
        const slidersContainer = document.getElementsByClassName("sliderField-sliders");
        for(let i = 0;i<slidersContainer.length;i+=1){
            setValueSliders[i] = slidersContainer[0].value;
        }
    }
    function handleProjectType(event){
        const projectTypeContainer = document.getElementsByClassName("checkField-projectType");
        let arrayTypeProject = []
        for(let i = 0;i<projectTypeContainer.length;i+=1){
            if(projectTypeContainer[i].checked){
                arrayTypeProject.push(projectTypeContainer[i].name)
            }
        }
        setProjectType(arrayTypeProject);
    }
    function handleEnterpriseStatus(event){
        const enterpriseStatusContainer = document.getElementsByClassName("checkField-enterpriseStatus");
        let i = 0;
        while(i < enterpriseStatusContainer.length){
            if(enterpriseStatusContainer[i].checked){
                setEnterpriseStatus(enterpriseStatusContainer[i].value)
                i = enterpriseStatusContainer.length;
            }
            i+=1;
        }
    }
    function handleAdvancement(event){
        const advancementContainer = document.getElementById("inputField-advancement");
        setAdvancement(advancementContainer.value);
    }
    function handleMotivationIB(event){
        const motivationContainer = document.getElementById("inputField-motivation");
        setMotivationIB(motivationContainer.value);
    }
    function handleDescription(event){
        const descriptionContainer = document.getElementById("inputField-description");
        setDescription(descriptionContainer.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await createProjectEntrepreneur({
            sliders: sliders,
            project_type: project_type[0],
            enterprise_status: enterprise_status,
            advancement: advancement,
            description: description,
            IB_network: motivation_IB,
            token: getToken
        })
        if(response.message === "Your project has been sent"){
            alert("Votre projet a été envoyé !");
        }
        else{
            console.log("response.message : ",response.message);
            alert("Une erreur est survenue, veuillez réessayer");
        }
    }
    return(
        <div>
            <h1>Nouveau projet</h1>
            <form id="createProject-form" onSubmit={handleSubmit}>
                <CheckBox valuesOption={["test1","test2"]} idName={"checkField-projectType"} classNameInput={"checkField-projectType"} onChange={handleProjectType}/>
                <Radio valuesOption={["status1","status2"]} name={"entrepriseStatus"}  classNameRadio={"checkField-enterpriseStatus"} onChange={handleEnterpriseStatus}/>
                <Slider valuesOption={["slider1","slider2"]} max={"100"} min={"0"} step={"1"} name={"entrepriseStatus"} classNameSlider={"sliderField-sliders"} valueSliders={valueSliders} onChangeSlider={handleSlidersChange}/>
                <InputField name={"Avancement du projet"} type={"text"} idName={"inputField-advancement"} placeholder={"Où en êtes vous sur le projet ?"} onChange={handleAdvancement}/>
                <InputField name={"Description du projet"} type={"text"} idName={"inputField-description"} placeholder={"Decrivez votre projet"} onChange={handleDescription}/>
                <InputField name={"Motivation pour le réseau IB"} type={"text"} idName={"inputField-motivation"} placeholder={"Decrivez vos motivations pour le réseau IB"} onChange={handleMotivationIB}/>
                <ButtonForm content={"Envoyer le formulaire"}/>
            </form>
            
        </div>
    )
}

export default CreateProject;