import React from "react";


function InputField({label, name,type,placeholder,onChange,idName}){
    return (
        <div class="inputField">
             <input className="lato" onChange={onChange} type={type} name={name} placeholder={placeholder} id={idName}/>
            <label className="lato" for={name}>{label}</label>
        </div>
    )
}
export default InputField;