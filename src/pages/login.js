import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState();
  const [token, setToken] = useState();
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const notify = (str) => {
    toast.error(str);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    const res = await fetch(`https://payscale-backend.onrender.com/api/login`, requestOptions);
    const data = await res.json();
    if (data?.success) {
      setToken(data?.token);
      localStorage.setItem("token", data?.token);
    } else {
      setError(data.error);
      notify(data.error);
    }
  };
  useEffect(() => {
    // Perform localStorage action
    const item = localStorage.getItem("token");
    setToken(item);
  }, [token]);

  if (token?.length > 10) {
    router.push("/");
  }

  return (
    <>
      <Toaster position="top-left" />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Username
                    </label>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Username : admin
                    </p>
                  </div>

                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="admin"
                    required
                    onChange={onChange}
                  />
                </div>
                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password : password
                    </p>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={onChange}
                  />
                </div>

                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
