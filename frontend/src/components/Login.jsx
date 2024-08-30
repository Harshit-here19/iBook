import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import toastifyContext from "../context/toastify/toastifyContext";

import Modal from "./Utility/Modal";

const Login = () => {
  const alert = useContext(toastifyContext);
  const { notify } = alert;

  const [showErrorModal, setShowErrorModal] = useState(false);

  let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    let form = e.target;
    let formData = new FormData(form);
    let formObj = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        "https://ibook-dmlh.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObj),
        }
      );

      const json = await response.json();
      // console.log(json);

      if (json.success) {
        //redirect
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        notify("Login Successful!!!");
      } else {
        setShowErrorModal(true);
        setTimeout(() => {
          setShowErrorModal(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeModal = () => {
    setShowErrorModal(false);
  };

  return (
    <>
      {showErrorModal && (
        <Modal closeModal={closeModal}>
          <div className="relative px-4 md:flex md:items-center md:justify-center">
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
              <div className="md:flex items-center">
                <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                  <i className="bx bx-error text-3xl">&#9888;</i>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <p className="font-bold">Warning!</p>
                  <p className="text-sm text-gray-700 mt-1">
                    Some Error Occurs Please try again later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div className="bg-gray-100 md:h-screen h-fit flex items-center justify-center">
        {/* <!-- Login Form --> */}

        <div className="relative z-10 bg-white p-8 rounded-md shadow-lg w-[90vw] md:w-1/2">
          <h1 className="text-xl font-bold mb-4">Login</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between gap-8">
              <button
                className="bg-bubble-gum hover:bg-orange-600 text-white font-bold py-2 px-8 rounded w-full"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
