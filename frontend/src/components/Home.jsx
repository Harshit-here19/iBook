import AddNote from "./AddNote";
import Notes from "./Notes";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      className="container w-screen mt-4 flex flex-col md:flex-row justify-between"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <AddNote />
      <Notes />
    </motion.div>
  );
};

export default Home;
