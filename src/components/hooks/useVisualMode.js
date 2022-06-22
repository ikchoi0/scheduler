import { useState } from "react";

export default function useVisualMode(initial) {
  const [modeHistory, setModeHistory] = useState([initial]);
  return {
    mode: modeHistory[modeHistory.length - 1],
    transition: (mode, replace = false) => {
      if (replace) {
        setModeHistory((prev) => {
          prev.pop();
          return [...prev, mode];
        });
      } else {
        setModeHistory((prev) => [...prev, mode]);
      }
    },
    back: () => {
      if (modeHistory.length > 1) {
        setModeHistory((prev) => {
          prev.pop();
          return [...prev];
        });
      }
    },
    clear: () => {
      setModeHistory(["EMPTY"]);
    },
  };
}
