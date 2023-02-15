import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";
import { AiFillFilePdf } from "react-icons/ai";
import { useEffect, useState } from "react";
import EditModal from "./editModal";
import EmployeeModal from "./employeeModal";
import generatePDF from "./reportGenerator";
import PdfComponent from "./pdfComponent";
const Info = ({ inputs, total_bank_balance }) => {
  const [updateData, setUpdateData] = useState();
  const [accountData, setAccountData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [emModal, setEmModal] = useState(false);

  const [pdfSingleData, setPdfSingleData] = useState();
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

    const resAccount = await fetch(
      `http://localhost:3001/api/getSingleAccount/${id}`
    );
    const dataAccount = await resAccount.json();
    generatePDF(data, dataAccount[dataAccount.length - 1]);
    setPdfSingleData(data);
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
