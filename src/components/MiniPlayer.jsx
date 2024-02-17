import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import classes from "../styles/MiniPlayer.module.css";
export default function MiniPlayer({ id, title }) {
  const buttonRef = useRef();
  const [toggleButton, setToggleButton] = useState(true);
  function minPlayer() {
    if (toggleButton) {
      setToggleButton(false);
      buttonRef.current.classList.add(classes.floatingBtn);
    } else {
      setToggleButton(true);
      buttonRef.current.classList.remove(classes.floatingBtn);
    }
  }
  console.log(toggleButton);
  return (
    <div
      ref={buttonRef}
      className={`${classes.miniPlayer}`}
      onClick={minPlayer}
    >
      <span className={`material-icons-outlined`}> play_circle_filled </span>
      <span
        className={`material-icons-outlined  ${classes.close}`}
        onClick={minPlayer}
      >
        {" "}
        close{" "}
      </span>
      <ReactPlayer
        style={{ display: !toggleButton ? "none" : "block" }}
        playing={toggleButton}
        width={"300px"}
        volume={0.2}
        height={"168px"}
        url={`https://www.youtube.com/watch?v=${id}`}
        controls={true}
      />
      <p>{title}</p>
    </div>
  );
}
