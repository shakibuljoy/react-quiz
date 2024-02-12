import classes from "../styles/Answers.module.css";
import Checkbox from "../components/formElement/Checkbox";
export default function Answers() {
  return (
    <div className={classes.answers}>
      <Checkbox className={classes.answer}> 
        <span>A New Hope 1</span>
      </Checkbox>
    </div>
  );
}
