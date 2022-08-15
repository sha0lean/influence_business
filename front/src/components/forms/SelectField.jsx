import React from "react";

function SelectField({name,valuesOption,onChange,idName}){
    return (
        <div class="selectFieldContainer">
            <label className="selectField" for={name}>{name}</label>
            <select className="selectField" onChange={onChange}  name={name}  id={idName}>                
                {valuesOption.map((value) => <option value={value}>{value}</option>)}
                
            </select>
        </div>
    )
}
export default SelectField;