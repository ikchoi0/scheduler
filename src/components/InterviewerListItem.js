import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";
export default function InterviewerListItem(props) {
  const interviewClass = classNames("interviewers__item",
  {
    "interviewers__item--selected": props.selected
  });
  
  return (
    <li className={interviewClass} onClick={() => props.setInterviewer()}>
      <img
        className={"interviewers__item-image"}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

function displayName (props) {
  return props.selected ? props.name : "";
}