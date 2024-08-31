import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import Loader from "./Utility/Loader";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, fetchNote, isLoading } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNote();
    } else {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="w-[95vw] mx-auto md:w-2/3 m-3 md:px-8 md:flex md:flex-col max-h-[100vh] ">
      <h1 className="text-xl font-semibold">Your Notes</h1>
      <div className="md:max-h-[70vh] max-h-fit flex flex-wrap justify-around overflow-y-auto no-scrollbar">
        {!isLoading &&
          notes.length !== 0 &&
          notes.map((note) => {
            return <NoteItem key={note._id} note={note} />;
          })}
        {!isLoading && notes.length === 0 && <h1>Add Some Note...</h1>}
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default Notes;
