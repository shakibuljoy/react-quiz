import classes from '../styles/Illustration.module.css'
import signup from '../assets/images/signup.svg'

export default function Illustration({img}) {
  return (
    <div className={classes.illustration}>
      <img src={img} alt="Signup" />
    </div>
  );
}
