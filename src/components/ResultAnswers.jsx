import classes from "../styles/Answers.module.css";
export default function ResultAnswers({ options = [] }) {
  return (
    <div className={classes.answers}>
      {options.map((option, index) => (
        <div key={index}>
          <label
            
            className={`${classes.answer} ${
              option.correct && option.checked
                ? classes.correct
                : option.checked && classes.wrong
            }`}
            htmlFor="option4"
          >
            {" "}
            <span>{option.title}</span>
            <span>{option.correct && option.checked
                ? "correct answer"
                : option.checked && !option.correct && "wrong answer"} {" "}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
