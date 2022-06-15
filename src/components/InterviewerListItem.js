import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";
export default function InterviewerListItem(props) {
  const interviewClass = classNames("interviewers__item",
  {
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={interviewClass} onClick={() => props.setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      {displayName(props)}
    </li>
  );
}

function displayName (props) {
  return props.selected ? props.name : "";
}