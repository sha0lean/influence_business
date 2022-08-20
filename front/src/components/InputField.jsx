import React from "react";


function InputField({ name, type, placeholder, onChange, idName }) {
    return (
        <div class="inputField">
            <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                for={name}
            >
                {name}
            </label>
            <input
                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                onChange={onChange}
                type={type}
                name={name}
                placeholder={placeholder}
                id={idName}
            />
        </div>
    )
}
export default InputField;