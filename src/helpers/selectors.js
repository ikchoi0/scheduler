function getAppointmentsForDay(state, day) {
  const appointmentDay = state.days.find((element) => {
    return element.name === day;
  });
  if (state.days.length === 0 || !appointmentDay) {
    return [];
  }
  const appointments = appointmentDay.appointments;
  return appointments.map((appointment) => state.appointments[appointment]);
}

function getInterview(state, interview) {
  return interview
    ? {
        student: interview.student,
        interviewer: state.interviewers[interview.interviewer],
      }
    : null;
}
function getInterviewersForDay(state, day) {
  const appointmentDay = state.days.find((element) => {
    return element.name === day;
  });
  if (state.days.length === 0 || !appointmentDay) {
    return [];
  }
  const interviewers = [];
  const appointments = appointmentDay.appointments;
  appointments.forEach((appointment) => {
    const interview = state.appointments[appointment].interview;
    if (interview) {
      interviewers.push(state.interviewers[Number(interview.interviewer)]);
    }
  });
  return interviewers;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
