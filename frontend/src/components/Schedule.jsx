import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import scheduleContext from "../context/schedule/scheduleContext";
import { CalendarMulti, CalendarMonth } from "./Cally";
import "cally";
import Modal from "./Utility/Modal";
import Loader from "./Utility/Loader";
import Button from "./Utility/Button";

const Schedule = () => {
  const context = useContext(scheduleContext);
  const { schedule, fetchSchedule, addSchedule, deleteSchedule, isLoading } =
    context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchSchedule();
    } else {
      navigate("/signup");
    }
  }, []);

  const [addTask, setAddTask] = useState(false);
  const [days, setDays] = useState("");
  const [calendarData, setCalendarData] = useState({
    color: "#7048e8",
    task: "",
  });

  const onChangeHandler = (e) => {
    setCalendarData({
      ...calendarData,
      [e.target.name]: e.target.value,
    });
  };

  const onChange = (e) => {
    setDays(e.target.value);
    setCalendarData({
      ...calendarData,
      days: e.target.value,
    });
  };

  const addTaskHandler = () => {
    addSchedule(calendarData.task, days, calendarData.color);
    setCalendarData({ days: "", color: "#7048e8", task: "" });
    setDays("");
  };

  return (
    <>
      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
      <div
        className="w-screenh-16 px-4 transition-all bg-[#2c3e50] font-bold text-2xl text-white text-center py-4 mb-4"
        onClick={() => {
          setAddTask(!addTask);
        }}
      >
        {addTask ? "SHOW TASK" : "ADD TASK"}{" "}
      </div>
      <div className="flex flex-wrap p-4">
        {addTask && (
          <div className="md:w-1/3 w-fit flex flex-col items-center border-1 py-4 px-8 shadow-2xl mx-auto">
            <CalendarMulti value={days} onChange={onChange}>
              <CalendarMonth color={calendarData.color} />
            </CalendarMulti>

            <div className="flex items-center">
              {/* Input */}
              <div className="w-full max-w-xs p-5 bg-white rounded-lg font-mono">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="unique-input"
                >
                  Enter the Task
                </label>
                <input
                  className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                  placeholder="Enter text here"
                  type="text"
                  name="task"
                  value={calendarData.task}
                  id="unique-input"
                  onChange={onChangeHandler}
                />
              </div>

              {/* Button */}
              <button
                className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                title="Add New"
                id="button"
                onClick={addTaskHandler}
              >
                <svg
                  className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                  viewBox="0 0 24 24"
                  height="50px"
                  width="50px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeWidth="1.5"
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  ></path>
                  <path strokeWidth="1.5" d="M8 12H16"></path>
                  <path strokeWidth="1.5" d="M12 16V8"></path>
                </svg>
              </button>

              <input
                id="color"
                name="color"
                type="color"
                value={calendarData.color}
                onChange={onChangeHandler}
              />
            </div>
          </div>
        )}

        {!addTask && (
          <div className="md:w-2/3 w-screen justify-center flex flex-wrap gap-3 relative">
            {schedule &&
              schedule.map((day, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center border-1 py-4 px-8 shadow-2xl hover:bg-red-400 bg-white"
                  onClick={() => {
                    deleteSchedule(day._id);
                  }}
                >
                  <h1 className="font-bold text-3xl">{day.task}</h1>
                  <hr className="border-y-1 my-2 border-black" />

                  <div className="h-fit w-fit relative">
                    <div className="absolute w-full h-full z-10"></div>
                    <calendar-multi value={day.dates}>
                      <calendar-month
                        style={{ "--color-accent": day.color }}
                      ></calendar-month>
                    </calendar-multi>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Schedule;
