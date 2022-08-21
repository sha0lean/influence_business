import React from "react";

function SelectField({ name, valuesOption, onChange, idName }) {
    return (
        <div class="w-full mb-0">
            <label
                className="block uppercase tracking-wide text-xs font-bold mb-2"
                for={name}
            >
                {name}
            </label>
            <div class="relative">

                <select
                    className=" appearance-none bg-white w-full py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white "
                    onChange={onChange}
                    name={name}
                    id={idName}
                >
                    {valuesOption.map((value) => <option
                        value={value}
                    >
                        {value}
                    </option>)}

                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}
export default SelectField;