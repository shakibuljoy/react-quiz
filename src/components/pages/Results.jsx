import Summary from "../Summary";
import imgSuccess from "../../assets/images/success.png";
import Question from "../Question";
export default function Results() {
  return (
    <>
      <Summary img={imgSuccess} score={"5 out of 10"} />
      <Question />
    </>
  );
}
