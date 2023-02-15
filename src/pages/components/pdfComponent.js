import React from "react";
import { Link } from "react-router-dom";

const PdfComponent = ({ pdfSingleData }) => {
  return (
    <div className="container">
      {pdfSingleData?.length === 0 ? (
        "You currently have no data"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">_ID</th>
              <th scope="col">UniqueId</th>
              <th scope="col">name</th>
              <th scope="col">mobile</th>
              <th scope="col">account</th>
              <th scope="col">address</th>
              <th scope="col">basic</th>
              <th scope="col">houserent</th>
              <th scope="col">medicalallowance</th>
            </tr>
          </thead>
          <tbody>
            {pdfSingleData?.map((value) => (
              <tr key={value._id}>
                <td>{value._id}</td>
                <td>{value.uniqueId}</td>
                <td>{value.name}</td>
                <td>{value.mobile}</td>
                <td>{value.account}</td>
                <td>{value.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PdfComponent;
