import React, { useState, useEffect } from "react";
import SweetPagination from "sweetpagination";
import axios from "axios";
import { Table } from "react-bootstrap";
import CompanyTableRow from "./CompanyTable";

  
const CompanyList = () => {
  const [companies, setCompany] = useState([]);
  const [pageList , setpageList] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/company/list")
      .then(({ data }) => {
        setCompany(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const DataTable = () => {
    return pageList.map((res, i) => {
      return <CompanyTableRow obj={res} key={i} />;
    });
  };
  
  return (
    <div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>CN Number</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
       
      </Table>
      <SweetPagination
        currentPageData={setpageList}
        dataPerPage={10}
        getData={companies}
        navigation={true}
      />
    </div>
  );
};
  
export { CompanyList };