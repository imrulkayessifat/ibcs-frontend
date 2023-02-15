import React, { use, useEffect, useState } from "react";

const EditModal = ({ setShowModal, updateData }) => {
  const [values, setValues] = useState({
    name: "",
    rank: "",
    address: "",
    mobile: "",
    account: "",
  });
  useEffect(() => {
    setValues((prevState) => ({
      ...prevState,
      name: updateData?.name,
      rank: updateData?.rank,
      address: updateData?.address,
      mobile: updateData?.mobile,
      account: updateData?.account,
    }));
  }, [updateData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    const res = await fetch(
      `http://localhost:3001/api/update/${updateData?.uniqueId}`,
      requestOptions
    );
    const data = await res.json();

    setShowModal(false);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div
      className="py-12 bg-white backdrop-blur-3xl transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
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
            Enter Employee Details
          </h1>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Name
            </label>
            <input
              id="name"
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="James"
              name="name"
              value={values?.name}
              required
              onChange={onChange}
            />
            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Rank
            </label>
            <select
              id="rank"
              name="rank"
              required
              value={values?.rank}
              onChange={onChange}
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>

            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Address
            </label>
            <input
              id="address"
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="sylhet"
              value={values?.address}
              name="address"
              required
              onChange={onChange}
            />
            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Mobile
            </label>
            <input
              id="mobile"
              type="number"
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="01736011747"
              value={values?.mobile}
              name="mobile"
              required
              onChange={onChange}
            />
            <label
              htmlFor="email2"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Account Number
            </label>
            <div className="relative mb-5 mt-2">
              <div className="absolute text-gray-600 flex items-center px-4 border-r h-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-credit-card"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <line x1="7" y1="15" x2="7.01" y2="15" />
                  <line x1="11" y1="15" x2="13" y2="15" />
                </svg>
              </div>
              <input
                id="account"
                type="number"
                className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border"
                placeholder="XXXX - XXXX - XXXX - XXXX"
                value={values?.account}
                name="account"
                required
                onChange={onChange}
              />
            </div>
            <div className="flex items-center justify-start w-full">
              <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
                Submit
              </button>
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
            <button
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              onClick={() => setShowModal(false)}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
