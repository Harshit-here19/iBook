import { useState } from "react";
import scheduleContext from "./scheduleContext";

const ScheduleState = (props) => {
  const host = "https://ibook-dmlh.onrender.com";

  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //TODO: Fetch all Schedule
  const fetchSchedule = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${host}/api/schedule/fetchallschedule`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      setSchedule(json.schedule);

      // console.log(json.schedule);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  //TODO: Add a Schedule
  const addSchedule = async (task, dates, color) => {
    const response = await fetch(`${host}/api/schedule/addschedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ task, dates, color }),
    });

    const newSchedule = await response.json();
    // console.log(newSchedule.savedSchedule);

    //TODO: here we want to add new entry to first for diplay purpose otherwise our backend is giving the data new to old
    setSchedule(schedule.concat(newSchedule.savedSchedule));
  };

  //TODO: Delete a Schedule
  const deleteSchedule = async (id) => {
    try {
      const response = await fetch(
        `${host}/api/schedule/deleteschedule/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      //eslint-disable-next-line
      const json = await response.json();

      // console.log(json);
    } catch (error) {
      console.log(error.message);
    }

    const newSchedule = schedule.filter((schedule) => schedule._id !== id);
    setSchedule(newSchedule);
  };

  return (
    <scheduleContext.Provider
      value={{
        schedule,
        addSchedule,
        deleteSchedule,
        fetchSchedule,
        isLoading,
      }}
    >
      {props.children}
    </scheduleContext.Provider>
  );
};

export default ScheduleState;
