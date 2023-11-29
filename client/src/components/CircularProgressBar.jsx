import React, { useState, useEffect } from "react";
import classes from "./circularProgressBar.module.css";

const CircularProgressBar = (props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(props.progress);
  }, [props.progress]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = ((100 - progress) / 100) * circumference;

  return (
    <svg className={classes["circular-progress"]} width="100" height="100">
      <circle
        className={classes["progress-bar"]}
        cx="50"
        cy="50"
        r={radius}
        strokeWidth="5"
        strokeDasharray={circumference}
        strokeDashoffset={String(offset)}
        transform={`rotate(-90 50 50)`}
      />
    </svg>
  );
};

export default CircularProgressBar;
