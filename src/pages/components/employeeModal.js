import React, { use, useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
const EmployeeModal = ({
  setEmModal,
  updateData,
  accountData,
  total_bank_balance,
}) => {
  const [data, setData] = useState();
  const [details, setDetails] = useState();
  const [values, setValues] = useState({
    basic: 0,
    rank: 0,
  });

  const [balance, setBalance] = useState({
    total_amount: 0,
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const notify = () => {
    toast.error("Does not have enough account balance!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const grade = parseInt(values?.rank);
    const updateGrade = grade - details?.rank;
    const basic = parseInt(values?.basic) + 5000 * updateGrade;
    const houseRent = (values?.basic * 20) / 100;
    const medical = (values?.basic * 15) / 100;
    const total = houseRent + medical + basic;
    values.basic = basic;
    values.houserent = houseRent;
    values.medicalallowance = medical;
    values.details = [details];

    details.rank = parseInt(values.rank);
    delete values.rank;
    if (Math.abs(total) > total_bank_balance) {
      notify();

      //setEmModal(false);
    } else {
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };
      const res = await fetch(
        `https://payscale-backend.onrender.com/api/send/${details?.uniqueId}`,
        requestOptions
      );
      const data = await res.json();

      const requestOptionsRank = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      };
      const resRank = await fetch(
        `https://payscale-backend.onrender.com/api/update/${details?.uniqueId}`,
        requestOptionsRank
      );
      const dataRank = await resRank.json();

      balance.total_amount = total_bank_balance - total;

      const requestOptionsBalance = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(balance),
      };
      const resBalance = await fetch(
        `https://payscale-backend.onrender.com/api/update_balance/650370fef9a50d68f703064e`,
        requestOptionsBalance
      );
      const dataBalance = await resBalance.json();

      setEmModal(false);
    }
  };

  useEffect(() => {
    if (accountData?.length) {
      setData(accountData[accountData?.length - 1]);
    }
    if (updateData) setDetails(updateData[0]);
  }, [accountData, updateData]);

  return (
    <>
      <Toaster position="top-left" />
      <div
        className="py-12 bg-white backdrop-blur-3xl transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
        id="modal"
      >
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
        >
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <div className="w-full flex justify-start text-gray-600 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-wallet"
                width="52"
                height="52"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
              </svg>
            </div>
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
              Employee Details
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="name" className="my-2 mx-1 text">
                ObjectId : {details?._id}
              </label>
              <label htmlFor="name" className="my-2 mx-1 text">
                Manually Created Id : {details?.uniqueId}
              </label>
              <label htmlFor="name" className="my-2 mx-1 text">
                Name : {details?.name}
              </label>
              <label htmlFor="name" className="my-2 mx-1 text">
                Rank : {details?.rank}
              </label>
              <label htmlFor="name" className="my-2 mx-1 text">
                Address : {details?.address}
              </label>
              <label htmlFor="name" className="my-2 mx-1 text">
                Mobile Number : {details?.mobile}
              </label>
              <label htmlFor="name" className="my-2 mx-1 text">
                Account Number : {details?.account}
              </label>
              <p className="my-2 mx-1">Basic Balance : {data?.basic} </p>
              <p className="my-2 mx-1">
                House Rent Balance : {data?.houserent}{" "}
              </p>
              <p className="my-2 mx-1">
                Medical Allowance Balance : {data?.medicalallowance}{" "}
              </p>
              <p className="my-2 mx-1">
                Total Balance :{" "}
                {data?.basic + data?.houserent + data?.medicalallowance}{" "}
              </p>
              <p className="my-2 mx-1 text-xl">
                Send money to {details?.name} account :{" "}
              </p>
              <select
                id="rank"
                name="rank"
                required
                onChange={onChange}
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              >
                <option defaultValue={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
              <input
                id="basic"
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="James"
                type="number"
                name="basic"
                required
                onChange={onChange}
              />
              <div className="flex items-center justify-start w-full">
                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
                  Send Money
                </button>
                <button
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                  onClick={() => setEmModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                  onClick={() => setEmModal(false)}
                  aria-label="close modal"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeModal;
