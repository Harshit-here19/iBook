import { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import toastifyContext from "../context/toastify/toastifyContext";

import EditForm from "./Utility/editForm";
import Modal from "./Utility/Modal";

const NoteItem = (props) => {
  const { note } = props;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const context = useContext(noteContext);
  const { deleteNote, editNote } = context;

  const alert = useContext(toastifyContext);
  const { notifyEdit, notifyDelete } = alert;

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const deleteHandler = () => {
    deleteNote(note._id);
    setShowDeleteModal(false);
    notifyDelete();
  };

  const editHandler = (newNote) => {
    // console.log(newNote)
    const { title, description, tag } = newNote;

    editNote(note._id, title, description, tag);

    setShowEditModal(false);
    notifyEdit();
  };

  const deleteModalContent = (
    <div className=" flex flex-col justify-between h-full">
      <h1 className="font-semibold bg-red-500 text-white text-2xl border rounded-2xl p-8 flex items-center justify-center mb-4">
        "Deleting a Note"
      </h1>
      <div className="my-4 text-center">
        <p className="mx-8 text-xl">"Are you sure about deleting the Note.</p>
        <p className="mx-8 text-xl">Press confirm for deletion..."</p>
      </div>
      <div className="p-4 mx-auto my-4">
        <button
          className="mx-2 bg-purple-600 py-2 px-12 rounded text-white hover:bg-white hover:border-purple-600 hover:text-black border-2"
          onClick={closeModal}
        >
          Close
        </button>
        <button
          className="mx-2 bg-red-600 py-2 px-12 rounded text-white hover:bg-white hover:border-red-800 hover:text-black border-2"
          onClick={deleteHandler}
        >
          Confirm
        </button>
      </div>
    </div>
  );

  const editModalContent = (
    <div className=" flex flex-col justify-between h-fit">
      <h1 className="font-semibold bg-bubble-gum text-white text-2xl border rounded-2xl py-4 flex items-center justify-center">
        Edit a Note
      </h1>

      <EditForm
        closeModal={closeEditModal}
        editHandler={editHandler}
        note={note}
      />
    </div>
  );

  const tagStyling = [
    "bg-green-400 hover:bg-green-500",
    "bg-yellow-200 hover:bg-yellow-300",
    "bg-red-200 hover:bg-red-300",
    "bg-gray-200 hover:bg-gray-300",
    "bg-orange-300 hover:bg-orange-400",
    "bg-pink-300 hover:bg-pink-400",
  ];

  let randomIndex = Math.floor(Math.random() * tagStyling.length);

  let date = new Date(note.date);

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-solo-leveling-400 w-1/2">
      {showDeleteModal && (
        <Modal closeModal={closeModal}> {deleteModalContent} </Modal>
      )}

      {showEditModal && (
        <Modal closeModal={closeEditModal}> {editModalContent} </Modal>
      )}
      <div className="px-6 py-4">
        <div className="flex items-baseline">
          <div className="font-bold text-xl mb-2 text-white">{note.title}</div>
          <i
            className="fa-solid fa-trash mx-2 hover:text-red-600"
            onClick={() => {
              setShowDeleteModal(true);
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2 hover:text-white"
            onClick={() => {
              setShowEditModal(true);
            }}
          ></i>
        </div>
        <hr className="border-y-1 my-2" />
        <div className="w-full overflow-auto no-scrollbar">
          <p className="text-base">{note.description}</p>
        </div>

        <div className="flex justify-center items-center">
          <p
            className={`py-1 px-2 rounded-lg h-fit text-sm w-fit mt-4 font-semibold ${tagStyling[randomIndex]}`}
          >
            {note.tag}
          </p>
          <p
            className={`bg-teal-400 hover:bg-teal-500 py-1 px-2 mx-2 rounded-lg text-sm w-fit mt-4 font-semibold ${
              tagStyling[randomIndex + 1]
            }`}
          >
            {date.toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
