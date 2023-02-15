/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import Info from "./components/info";
import Modal from "./components/modal";
import Account from "./components/account";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function Home({ dataPost, total_balance }) {
  const [statePost, setStatePost] = useState();
  const router = useRouter();
  const [find, setFind] = useState();

  const total_bank_balance = total_balance[0]?.total_amount;
  useEffect(() => {
    setStatePost(dataPost);
  }, [dataPost]);
  const [showModal, setShowModal] = useState(false);

  const destroy = async () => {
    let token = "JWT " + localStorage.getItem("token");
    console.log(token);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
    };
    const res = await fetch(`http://localhost:3001/api/logout`, requestOptions);
    const data = await res.json();
    if (data?.success) {
      setFind(data?.success);
      localStorage.removeItem("token");
    }
  };
  if (typeof window !== "undefined") {
    if (localStorage.getItem("token") == null) {
      router.push("/login");
    }
  }

  // useEffect(()=>{
  //   router.push("/login")
  // },[find])
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="m-8">
        <div className="flex justify-between">
          <h1 className="text-xl">Employee Status : </h1>
          <p className="px-5 text-xl">
            Total Bank Balance : {total_bank_balance}
          </p>
          <button
            onClick={() => destroy()}
            className="bg-blue-500 cursor-pointer text-white font-bold py-2 px-4 rounded"
          >
            LogOut
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalScrollableLabel"
          >
            ADD
          </button>
          {showModal ? (
            <>
              <Modal setShowModal={setShowModal} />
            </>
          ) : null}
        </div>
        <Account total_bank_balance={total_bank_balance}/>
        
        <Info total_bank_balance={total_bank_balance} inputs={statePost} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const posts = await fetch(`http://localhost:3001/api/getAll`);
  const dataPost = await posts.json();

  const balance = await fetch(
    `http://localhost:3001/api/get_balance/63ec453886139528d674a584`
  );
  const total_balance = await balance.json();
  return {
    props: { dataPost, total_balance },
  };
}
