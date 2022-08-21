import React from "react";

function CheckBox({valuesOption,onChange,classNameInput,idName}){
    return (
        <div class="checkBoxContainer">
            <fieldset  id={idName}> 
                {valuesOption.map((value,index) => <div className={"chekboxValue"}><label for={value + index.toString()}>{value + index.toString()}</label><input type="checkbox" className={classNameInput} id={value + index.toString()} name={value + index.toString()} onChange={onChange}/></div>)}
            </fieldset>
        </div>
    )
}
export default CheckBox;