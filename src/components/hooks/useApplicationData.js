import { useState, useEffect, useReducer } from "react";
import axios from "axios";
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData() {
  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };
      case SET_INTERVIEW:
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview,
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment,
        };
        return {
          ...state,
          days: action.updatedDays,
          appointments,
        };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
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

      return axios
        .put(`/api/appointments/${id}`, appointment)
        .then((response) => {
          const updatedDays = updateSpots(state, true);
          dispatch({ type: SET_INTERVIEW, id: id, interview, updatedDays });
        });
    },
    cancelInterview: (id) => {
      return axios.delete(`/api/appointments/${id}`).then(() => {
        const updatedDays = updateSpots(state);
        dispatch({ type: SET_INTERVIEW, id, interview: null, updatedDays });
      });
    },
  };
}
const updateSpots = (state, onBook = false) => {
  const dayIndex = WEEKDAYS.indexOf(state.day);
  const newDays = [...state.days];
  newDays[dayIndex].spots = onBook
    ? newDays[dayIndex].spots - 1
    : newDays[dayIndex].spots + 1;
  return newDays;
};
