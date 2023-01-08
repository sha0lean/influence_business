import React from "react";

function InputList({ type, name, valuesOption, onChange }) {
	return (
		<div class="inputListContainer">
			{valuesOption.map((value) =>
				<div class="elementInputListContainer " onChange={onChange}>
					<input type={type} className="inputList lato" checked id={value} name={name} value={value} />
					<label for={value}>{value}</label>
				</div>



			)}

		</div>
	)
}
export default InputList;