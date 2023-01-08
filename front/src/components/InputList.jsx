import React from "react";

function InputList({ type, name, valuesOption, onClick }) {
	return (
		<div class="inputListContainer">
			{valuesOption.map((value) =>
				<div class="elementInputListContainer ">
					<input type={type} className="inputList lato" checked id={value} name={name} value={value} />
					<label for={value} onClick={onClick}>{value}</label>
				</div>



			)}

		</div>
	)
}
export default InputList;