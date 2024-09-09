import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toastifyContext from "../context/toastify/toastifyContext";
import NavButtons from "./Utility/NavButtons";

import Modal from "./Utility/Modal";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userName: "",
    userEmail: "",
  });

  const context = useContext(toastifyContext);
  const { notify } = context;

  const { pathname } = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://ibook-dmlh.onrender.com/api/auth/getuser",
          {
            method: "POST",
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        const json = await response.json();
        // console.log(json);
        setUserDetails({ userName: json.name, userEmail: json.email });
      } catch (error) {
        console.log(error.message);
      }
    };

    if (localStorage.getItem("token")) {
      fetchUser();
    }
  }, [pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    notify("Logout Successful!!!");
  };

  const userButton = (
    <li>
      <div className="flex flex-wrap justify-center gap-6 cursor-pointer">
        <div className="relative" onClick={() => setShowUser(!showUser)}>
          <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
          <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-bubble-gum hover:text-gray-900">
            {<i className="fa-solid fa-user"></i> || "User"}
          </span>
        </div>
      </div>
    </li>
  );

  return (
    <>
      <nav className="bg-solo-leveling-300 text-white p-4 flex justify-between items-start">
        <div className="text-3xl font-extrabold">iBook</div>
        <ul className="hidden md:flex space-x-4">
          {localStorage.getItem("token") && userButton}
          <li>
            <NavButtons path={pathname} title="Home" to="/" />
          </li>
          <li>
            <NavButtons path={pathname} title="About" to="/about" />
          </li>
          {!localStorage.getItem("token") && (
            <li>
              <NavButtons path={pathname} title="Login" to="/login" />
            </li>
          )}
          {!localStorage.getItem("token") && (
            <li>
              <NavButtons path={pathname} title="Signup" to="/signup" />
            </li>
          )}
          {localStorage.getItem("token") && (
            <li>
              <NavButtons title="Logout" onClick={handleLogout} />
            </li>
          )}
          {localStorage.getItem("token") && (
            <li>
              <NavButtons path={pathname} title="Schedule" to="/schedule" />
            </li>
          )}
        </ul>
        <div className="md:hidden list-none flex gap-4">
          {localStorage.getItem("token") && userButton}
          <button onClick={toggleMobileMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="(link unavailable)"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <ul className="bg-solo-leveling-300 text-white p-4 flex flex-col gap-8 justify-between items-center w-1/3 right-0 absolute rounded-bl-lg animate-appearing z-30">
          <li onClick={() => setMobileMenuOpen(false)}>
            <NavButtons path={pathname} title="Home" to="/" />
          </li>
          <li onClick={() => setMobileMenuOpen(false)}>
            <NavButtons path={pathname} title="About" to="/about" />
          </li>
          {!localStorage.getItem("token") && (
            <li onClick={() => setMobileMenuOpen(false)}>
              <NavButtons path={pathname} title="Login" to="/login" />
            </li>
          )}
          {!localStorage.getItem("token") && (
            <li onClick={() => setMobileMenuOpen(false)}>
              <NavButtons path={pathname} title="Signup" to="/signup" />
            </li>
          )}
          {localStorage.getItem("token") && (
            <li onClick={() => setMobileMenuOpen(false)}>
              <NavButtons title="Logout" onClick={handleLogout} />
            </li>
          )}
        </ul>
      )}
      {showUser && (
        <Modal closeModal={() => setShowUser(false)}>
          <div className="bg-solo-leveling-300 text-white p-4 flex flex-col gap-8 justify-between items-center w-full rounded-bl-lg">
            <p className="text-4xl font-bold">{userDetails.userName}</p>
            <hr className="border-2 w-full" />
            <p className="text-2xl font-semibold">{userDetails.userEmail}</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Navbar;
