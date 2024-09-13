import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import Home from "./Home";
import About from "./About";
import Login from "./Login";
import Schedule from "./Schedule";
import Signup from "./Signup";

import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
