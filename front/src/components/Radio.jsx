import React from "react";

function Radio({ name, valuesOption, onChange, idName, classNameRadio }) {
    return (
        <div id={idName}>
            {valuesOption.map((value) => <div className={"radioCheckValue"}><label for={value}>{value}</label><input type="radio" id={value} name={name} value={value} className={classNameRadio} onChange={onChange} /></div>)}
        </div>
    )
}
export default Radio;