import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { HashRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Root from "./components/Root";
import Schedule from "./components/Schedule";
import Signup from "./components/Signup";
import ErrorPage from "./components/Utility/ErrorPage";

import NoteState from "./context/notes/NoteState";
import ScheduleState from "./context/schedule/ScheduleState";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NoteState>
        <ScheduleState>
          <RouterProvider router={router} />
        </ScheduleState>
      </NoteState>
    </>
  );
}

export default App;
