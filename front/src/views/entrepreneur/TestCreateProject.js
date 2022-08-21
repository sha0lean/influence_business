import React, { useState } from "react";
import { api } from "/src/configApi.js";
import axios from "axios";

// forms
import ButtonForm from "components/forms/ButtonForm.jsx";
import InputField from "components/forms/InputField.jsx";
import CheckBox from "components/forms/CheckBox.jsx";
import Radio from "components/forms/Radio.jsx";
import Slider from "components/forms/Slider.jsx";

function TestCreateProject() {
    return (
        <div>
            <h1>Nouveau projet</h1>
            <form id="createProject-form">
                <CheckBox
                    valuesOption={["test1", "test2"]}
                    idName={"checkField-projectType"}
                    classNameInput={"checkField-projectType"}
                />
                <Radio
                    valuesOption={["status1", "status2"]}
                    name={"entrepriseStatus"}
                    classNameRadio={"checkField-enterpriseStatus"}
                />
                <Slider
                    valuesOption={["slider1", "slider2"]}
                    max={"100"}
                    min={"0"}
                    step={"1"}
                    name={"entrepriseStatus"}
                    classNameSlider={"sliderField-sliders"}
                />
                <InputField
                    name={"Avancement du projet"}
                    type={"text"}
                    idName={"inputField-advancement"}
                    placeholder={"Où en êtes vous sur le projet ?"}
                />
                <InputField
                    name={"Description du projet"}
                    type={"text"}
                    idName={"inputField-description"}
                    placeholder={"Decrivez votre projet"}
                />
                <InputField
                    name={"Motivation pour le réseau IB"}
                    type={"text"}
                    idName={"inputField-motivation"}
                    placeholder={"Decrivez vos motivations pour le réseau IB"}
                />
                <ButtonForm
                    content={"Envoyer le formulaire"} />
            </form>

        </div>
    )
}

export default TestCreateProject;