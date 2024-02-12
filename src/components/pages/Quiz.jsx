import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";
import img3 from "../../assets/images/3.jpg";

export default function Quiz() {
  return (
    <>
      <h1>Pick three of your favorite Star Wars Flims</h1>
      <h4>Question can have multiple answers</h4>
      <Answers />
      <ProgressBar />
      <MiniPlayer
        title={"#23 React Hooks Bangla - React useReducer hook Bangla"}
        img={img3}
      />
    </>
  );
}
