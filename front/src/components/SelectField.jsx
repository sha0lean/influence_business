import React from "react";

function SelectField({name,valuesOption,onChange,idName}){
    return (
        <div class="selectFieldContainer">
            <label className="labelSelectField lato" for={name}>{name}</label>
            <select className="selectField lato" onChange={onChange}  name={name}  id={idName}>                
                {valuesOption.map((value) => <option className="lato" value={value}>{value}</option>)}
                
            </select>
        </div>
    )
}
export default SelectField;