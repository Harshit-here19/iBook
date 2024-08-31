import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://ibook-dmlh.onrender.com";

  const notesInit = [];

  const [notes, setNotes] = useState(notesInit);
  const [isLoading, setIsLoading] = useState(true);

  //TODO: Fetch all Note
  const fetchNote = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      setNotes(json.notes);

      console.log(json.notes);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  //TODO: Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const newNote = await response.json();
    // console.log(newNote.savedNote);

    //TODO: here we want to add new entry to first for diplay purpose otherwise our backend is giving the data new to old
    setNotes(notes.concat(newNote.savedNote));
  };

  //TODO: Delete a Note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      //eslint-disable-next-line
      const json = await response.json();

      // console.log(json);
    } catch (error) {
      console.log(error.message);
    }

    const newNote = notes.filter((note) => note._id !== id);
    setNotes(newNote);
  };

  //TODO: Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    //eslint-disable-next-line
    const json = response.json;
    // console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchNote, isLoading }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
