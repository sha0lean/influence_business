import React from "react";


function InputField({name,type,placeholder,onChange,idName}){
    return (
        <div class="inputField">
            <label className="inputField-label label" for={name}>{name}</label>
            <input className="inputField-input input" onChange={onChange} type={type} name={name} placeholder={placeholder} id={idName}/>
        </div>
    )
}
export default InputField;