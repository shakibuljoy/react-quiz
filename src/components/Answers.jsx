import Checkbox from "../components/formElement/Checkbox";
import classes from "../styles/Answers.module.css";
export default function Answers({ options = [], handleChange }) {
  return (
    <div className={classes.answers}>
      {options.map((option, index) => (
        <Checkbox key={index} onChange={(e) => handleChange(e, index)} checked={option.checked} className={classes.answer}>
          <span>{option.title}</span>
        </Checkbox>
      ))} 
    </div>
  );
}
