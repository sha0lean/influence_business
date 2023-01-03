import React from "react";


function InputField({name,type,placeholder,onChange,idName,required}){
    return (
        <div class="inputField">
            <div id="containerLabel">
                <label className="lato" for={name}>{name}</label>
                {required && <span class="required">*</span>}
            </div>
            <input className="lato" onChange={onChange} type={type} name={name} placeholder={placeholder} id={idName}/>
        </div>
    )
}
export default InputField;