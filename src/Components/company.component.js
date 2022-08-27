import React, { useState } from "react";
import axios from "axios";
import { FormGroup, Button, Form } from "react-bootstrap";
import AsyncSelect from 'react-select/async';
import { useNavigate } from "react-router-dom";

const Company = () => {

	const navigate = useNavigate();

	const [companyName, setCompanyName] = useState(null);
	const [submitFlag , setSubmitFlag] = useState(false);

	const loadOptions = (value, callback)=> {
		if(value) {
			axios
			.post("http://localhost:4000/api/company/getDetails", { key : value })
			.then((res) => {
				if(res.status == 200) {
				callback(res.data)
				}else {
				callback([]);
				}
				
			})
			.catch((err) => {
				return callback([])
			});
			}
		else {
			callback([]);
		}
	}

const onChange = () => {

    axios
    .post("http://localhost:4000/api/company/submit",companyName)
    .then((res) => {
      if(res.status == 200) {
        navigate("/company/list");
      }
      
    })
    .catch((err) => {

      if(err.response.status == 409 ) {
        alert("Company Already Added! Please Select Another One")
      }
      console.log(err, "error");
    });

  };


  return (
    <div className="form-wrapper">
		<Form>
			<FormGroup>
				<AsyncSelect
					cacheOptions
					loadOptions={loadOptions}
					defaultOptions
					onChange={(e) => {
					setCompanyName(e)
					setSubmitFlag(false);
					}}
			/>
		{ submitFlag &&  <div className="text-danger">Input Field is Required</div>}
			</FormGroup>
				<Button onClick={() => {
					if(companyName) {
						onChange();
					}
					else {
						setSubmitFlag(true);
					}
			}} 
				size="sm" variant="danger" style={{"marginTop" : "10px"}}>
				Submit
				</Button>
		</Form>
    </div>
  );
};

export { Company };
