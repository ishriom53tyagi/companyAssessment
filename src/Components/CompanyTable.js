import React from "react";

const CompanyTableRow = (props) => {
const { name, cn_number } = props.obj;

return (
	<tr>
	<td>{name}</td>
	<td>{cn_number}</td>
	</tr>
);
};

export default CompanyTableRow;
