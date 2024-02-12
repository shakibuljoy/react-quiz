import classes from "../styles/MiniPlayer.module.css";
export default function MiniPlayer({ img, title }) {
  return (
    <div className={`${classes.miniPlayer} ${classes.floatingBtn}`}>
      <span className={`material-icons-outlined  ${classes.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span className={`material-icons-outlined  ${classes.close}`}>
        {" "}
        close{" "}
      </span>
      <img src={img} alt="" />
      <p>{title}</p>
    </div>
  );
}
