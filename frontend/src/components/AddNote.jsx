import { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import toastifyContext from "../context/toastify/toastifyContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote, GOTnote } = context;

  const alert = useContext(toastifyContext);
  const { notify } = alert;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const submitHadler = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    notify("Note Addedd Successful!!!");
  };

  const gotSubmitHandler = (e) => {
    e.preventDefault();
    GOTnote();
    notify("Note Addedd Successful!!!");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    // console.log(e.target.name);
  };

  const disableClass =
    "bg-gray-500 hover:cursor-not-allowed text-white font-bold py-2 px-8 rounded";

  const regularClass =
    "bg-bubble-gum hover:bg-orange-600 text-white font-bold py-2 px-8 rounded";

  return (
    <div className="w-[95vw] mx-auto md:w-1/3 m-3 max-h-[100vh] md:ml-8">
      <h1 className="text-xl font-semibold">Add a New Note</h1>

      <form
        className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
        action=""
      >
        <div className="flex flex-col mb-6 -mx-3">
          <div className="w-full px-3 mb-3">
            <label
              htmlFor="name"
              className="block uppercase tracking-wide text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="title"
              name="title"
              placeholder="Enter Your Title"
              onChange={onChange}
              value={note.title}
            />
          </div>

          <div className="w-full px-3 mb-3">
            <label
              htmlFor="tag"
              className="block uppercase tracking-wide text-gray-700 font-bold mb-2"
            >
              Tag
            </label>
            <input
              type="text"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="tag"
              name="tag"
              placeholder="Tag Field"
              onChange={onChange}
              value={note.tag}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              htmlFor="description"
              className="block uppercase tracking-wide text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="description"
              name="description"
              placeholder="Enter a description"
              onChange={onChange}
              value={note.description}
            />
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            className={
              note.title.trim().length < 5 || note.description.trim().length < 5
                ? disableClass
                : regularClass
            }
            type="submit"
            onClick={submitHadler}
          >
            Add Note
          </button>

          <button
            class="px-6 py-2 min-w-[120px] text-center text-bubble-gum border border-bubble-gum rounded hover:bg-bubble-gum font-bold hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
            onClick={gotSubmitHandler}
          >
            Game of Throne
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
