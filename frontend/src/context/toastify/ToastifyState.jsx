import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import toastifyContext from "./toastifyContext";

const ToastifyState = (props) => {
  const notify = (title) => toast(title);
  const notifyEdit = () => toast.success("Note Editied Successfully!!!");
  const notifyDelete = () => toast.error("Note Deleted Successfully!!!");

  return (
    <toastifyContext.Provider value={{ notify, notifyEdit, notifyDelete }}>
      {props.children}
    </toastifyContext.Provider>
  );
};

export default ToastifyState;
