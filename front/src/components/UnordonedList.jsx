import React from "react";

function UnordonedList({ valuesOption, onClick }) {
	return (
		<ul class="unordonedListContainer">
			{valuesOption.map((value) =>
				<li class="lato" onClick={onClick}>{value}</li>
			)}
		</ul>
	)
}
export default UnordonedList;