import React from "react";
import ReactDom from "react-dom";

const Backdrop = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20 bg-[rgba(0,0,0,0.75)]"
      onClick={props.closeModal}
    />
  );
};

const ModalOverlay = (props) => {
  return (
    <div className="fixed top-[20%] left-[25%] md:left-[calc(50%-20rem)] bg-white border rounded-2xl shadow z-30 h-fit w-[90%] md:w-[70%] animate-appearing overflow-hidden">
      {props.children}
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay children={props.children} />,
        portalElement
      )}
    </>
  );
};

export default Modal;
