import AddNote from "./AddNote";
import Notes from "./Notes";

const Home = () => {
  return (
    <div className="container w-screen mt-4 flex flex-col md:flex-row justify-between">
      <AddNote />
      <Notes />
    </div>
  );
};

export default Home;
