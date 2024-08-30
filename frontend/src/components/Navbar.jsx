import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toastifyContext from "../context/toastify/toastifyContext";
import NavButtons from "./Utility/NavButtons";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const context = useContext(toastifyContext);
  const { notify } = context;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const { pathname } = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    notify("Logout Successful!!!");
  };

  return (
    <>
      <nav className="bg-solo-leveling-300 text-white p-4 flex justify-between items-start">
        <div className="text-3xl font-bold">iBook</div>
        <ul className="hidden md:flex space-x-4">
          <NavButtons path={pathname} title="Home" to="/" />
          <NavButtons path={pathname} title="About" to="/about" />
          {!localStorage.getItem("token") && (
            <NavButtons path={pathname} title="Login" to="/login" />
          )}
          {!localStorage.getItem("token") && (
            <NavButtons path={pathname} title="Signup" to="/signup" />
          )}
          {localStorage.getItem("token") && (
            <NavButtons title="Logout" onClick={handleLogout} />
          )}
        </ul>
        <div className="md:hidden">
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
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <ul className="bg-solo-leveling-300 text-white p-4 flex flex-col gap-8 justify-between items-center w-1/3 right-0 absolute rounded-bl-lg animate-appearing">
          <NavButtons path={pathname} title="Home" to="/" />
          <NavButtons path={pathname} title="About" to="/about" />
          {!isLoggedIn && (
            <NavButtons path={pathname} title="Login" to="/login" />
          )}
          {!isLoggedIn && (
            <NavButtons path={pathname} title="Signup" to="/signup" />
          )}
          {isLoggedIn && <NavButtons title="Logout" onClick={handleLogout} />}
        </ul>
      )}
    </>
  );
};

export default Navbar;
