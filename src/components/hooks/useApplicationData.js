import { useState, useEffect } from "react";
import axios from "axios";
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      // console.log(all[1].data, all[2].data);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  return {
    state,
    setDay,
    bookInterview: (id, interview) => {
      const appointment = {
        ...state.appointments[id],
        interview: interview,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      return axios
        .put(`/api/appointments/${id}`, appointment)
        .then((response) => {
          setState((prev) => {
            return {
              ...prev,
              days: updateSpots(prev, true),
              appointments,
            };
          });
        });
    },
    cancelInterview: (id) => {
      return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState((prev) => {
          return {
            ...prev,
            days: updateSpots(prev, false),
          };
        });
      });
    },
  };
}
const updateSpots = (state, onBook = true) => {
  const dayIndex = WEEKDAYS.indexOf(state.day);
  const newDays = [...state.days];
  newDays[dayIndex].spots = onBook
    ? newDays[dayIndex].spots - 1
    : newDays[dayIndex].spots + 1;
  return newDays;
};
