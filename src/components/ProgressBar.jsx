import { useRef, useState } from "react";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";
export default function ProgressBar({
  handleNext,
  handlePrev,
  percentage,
  handleSubmit,
}) {
  const tooltipRef = useRef();
  const [tooltip, setTooltip] = useState(false);

  function toggleTooltip() {
    if (tooltip) {
      setTooltip(false);
      tooltipRef.current.style.display = "none";
    } else {
      setTooltip(true);
      tooltipRef.current.style.display = "block";
      tooltipRef.current.style.left = `calc(${percentage}% - 65px)`;
    }
  }
  return (
    <div className={classes.progressBar}>
      <div onClick={handlePrev} className={classes.backButton}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div
        className={classes.rangeArea}
        onMouseOver={toggleTooltip}
        onMouseOut={toggleTooltip}
      >
        <div className={classes.tooltip} ref={tooltipRef}>
          {percentage}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <Button
        onClick={percentage < 100 ? handleNext : handleSubmit}
        className={classes.next}
      >
        <span>{percentage < 100 ? "Next Question" : "Submit"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
