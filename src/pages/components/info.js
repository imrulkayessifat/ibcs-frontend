import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";
import { AiFillFilePdf } from "react-icons/ai";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "jspdf-autotable";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import EditModal from "./editModal";
import EmployeeModal from "./employeeModal";
const Info = ({ inputs, total_bank_balance }) => {
  const [updateData, setUpdateData] = useState();
  const [accountData, setAccountData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [emModal, setEmModal] = useState(false);
  const [temp,setTemp] = useState([]);
  const singleData = async (id) => {
    const res = await fetch(`http://localhost:3001/api/getOne/${id}`);
    const data = await res.json();
    setUpdateData(data);
    const resAccount = await fetch(
      `http://localhost:3001/api/getSingleAccount/${id}`
    );
    const dataAccount = await resAccount.json();
    setAccountData(dataAccount);
  };

  const pdfData = async (id) => {
    const res = await fetch(`http://localhost:3001/api/getOne/${id}`);
    const data = await res.json();
    console.log(id,data);
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = [
      "Id",
      "UniqueId",
      "name",
      "address",
      "mobile",
      "account",
      "rank",
    ];
    let rows = [];
    // let temp = [
    //   data?._id,
    //   data?.uniqueId,
    //   data.name,
    //   data.address,
    //   data.mobile,
    //   data.account,
    //   data.rank,
    // ];
    temp.push(data?.uniqueId);
    
    console.log(temp);
    pdf.text(235, 40, "Tabla de Prestamo");
    pdf.autoTable(columns, rows, {
      startY: 65,
      theme: "grid",
      styles: {
        font: "times",
        halign: "center",
        cellPadding: 3.5,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0],
      },
      headStyles: {
        textColor: [0, 0, 0],
        fontStyle: "normal",
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        fillColor: [166, 204, 247],
      },
      alternateRowStyles: {
        fillColor: [212, 212, 212],
        textColor: [0, 0, 0],
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      rowStyles: {
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      tableLineColor: [0, 0, 0],
    });
    console.log(pdf.output("datauristring"));
    //pdf.save("pdf");
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3001/api/delete/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    NAME
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    RANK
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    ADDRESS
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    MOBILE
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    BANK ACCOUNT
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {inputs?.map((input) => (
                  <tr key={input.uniqueId} className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {input.uniqueId}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {input.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {input.rank}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {input.address}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {input.mobile}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {input.account}
                    </td>
                    <td className="py-4 flex justify-evenly">
                      <AiOutlineEdit
                        onClick={() => {
                          setShowModal(true);
                          singleData(input.uniqueId);
                        }}
                        className="cursor-pointer"
                      />
                      {showModal ? (
                        <>
                          <EditModal
                            setShowModal={setShowModal}
                            updateData={updateData}
                          />
                        </>
                      ) : null}
                      <AiOutlineDelete
                        onClick={() => {
                          handleDelete(input.uniqueId);
                        }}
                        className="cursor-pointer"
                      />
                      <AiOutlineSend
                        onClick={() => {
                          setEmModal(true);
                          singleData(input.uniqueId);
                        }}
                        className="cursor-pointer"
                      />
                      {emModal ? (
                        <>
                          <EmployeeModal
                            setEmModal={setEmModal}
                            updateData={updateData}
                            accountData={accountData}
                            total_bank_balance={total_bank_balance}
                          />
                        </>
                      ) : null}

                      <AiFillFilePdf
                        onClick={() => {
                          pdfData(input.uniqueId);
                        }}
                        className="cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
