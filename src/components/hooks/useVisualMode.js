import { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition (newMode, replace = false) {
    if (replace) {
      console.log("rendered");
      history.pop();
    } else {
      history.push(mode);
    }
    setMode(newMode);
  };
  function back () {
    const lastItem = history.pop();
    setMode(lastItem);   
  }
  return { mode, transition, back};
}
