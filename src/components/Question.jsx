import classes from "../styles/Question.module.css";
import ResultAnswers from "./ResultAnswers";

export default function Question({ answer }) {
  return (
    <div className={classes.question}>
      <div className={classes.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {answer.title}
      </div>
      <ResultAnswers options={answer.options} />
    </div>
  );
}
