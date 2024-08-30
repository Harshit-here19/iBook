import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import toastifyContext from "../context/toastify/toastifyContext";
import Modal from "./Utility/Modal";

const Signup = () => {
  const alert = useContext(toastifyContext);
  const { notify } = alert;

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [warningText, setWarningText] = useState(
    "Some Error Occurs Please try again later."
  );
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { name, email, password } = credentials;

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const json = await response.json();
      // console.log(json);

      if (json.success) {
        //redirect
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        notify("Signup Successful!!!");
      } else {
        if (json.exists) {
          setWarningText(json.error);
        }
        setShowErrorModal(true);
        setTimeout(() => {
          setShowErrorModal(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const validCond =
    credentials.password === credentials.cpassword &&
    credentials.password.trim().length > 5 &&
    credentials.cpassword.trim().length > 5 &&
    credentials.name.trim().length > 3 &&
    credentials.email.trim().length > 0 &&
    credentials.email.includes("@");

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
                  <p className="text-sm text-gray-700 mt-1">{warningText}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        {/* <!-- Signup Form --> */}
        <div className="relative z-10 bg-white p-8 rounded-md shadow-lg">
          <h1 className="text-xl font-bold mb-4">Signup</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="name"
                name="name"
                type="name"
                placeholder="Name"
                onChange={onChange}
              />
            </div>
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
                onChange={onChange}
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
                onChange={onChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="cpassword"
              >
                Confirm Password
              </label>
              <input
                className="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="cpassword"
                name="cpassword"
                type="password"
                placeholder="Confirm Password"
                onChange={onChange}
              />
            </div>

            <div className="flex items-center justify-between gap-8">
              <button
                className={`${
                  validCond
                    ? "bg-bubble-gum hover:bg-orange-600"
                    : "bg-gray-600 hover:pointer-not-allowed"
                } text-white font-bold py-2 px-8 rounded w-full`}
                type="submit"
              >
                Register
              </button>
              <p>Already have a Account? </p>
              <Link
                className="inline-block align-baseline font-bold text-sm text-cyan-500 hover:text-cyan-800"
                to="/login"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
