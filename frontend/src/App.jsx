import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastifyState from "./context/toastify/ToastifyState";

import Navbar from "./components/Navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";
import ErrorPage from "./components/Utility/ErrorPage";

import NoteState from "./context/notes/NoteState";
import ScheduleState from "./context/schedule/ScheduleState";

function App() {
  return (
    <>
      <NoteState>
        <ScheduleState>
          <ToastifyState>
            <Router>
              <ToastContainer />
              <Navbar />
              <AnimatedRoutes />
            </Router>
          </ToastifyState>
        </ScheduleState>
      </NoteState>
    </>
  );
}

export default App;
