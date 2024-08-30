import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";
import ToastifyState from "../context/toastify/ToastifyState";

const Root = () => {
  return (
    <ToastifyState>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </ToastifyState>
  );
};

export default Root;
