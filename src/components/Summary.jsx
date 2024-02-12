import classes from "../styles/Summary.module.css";
export default function Summary({ score, img }) {
  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        {/* progress bar will be placed here */}
        <p className={classes.score}>
          Your score is <br />
          {score}
        </p>
      </div>
      <div className={classes.badge}>
        <img src={img} alt="Success" />
      </div>
    </div>
  );
}
