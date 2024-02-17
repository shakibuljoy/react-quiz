import img3 from "../assets/images/3.jpg";
import classes from "../styles/Video.module.css";
export default function Video({ title, noq, id }) {
  return (
    <div className={classes.video}>
      <img src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={id} />
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{noq} Questions</p>
        <p>Total Points: {noq * 5}</p>
      </div>
    </div>
  );
}
