import Summary from "../Summary";
import imgSuccess from "../../assets/images/success.png";
import Question from "../Question";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import _ from "lodash-es";
import { useMemo } from "react";
export default function Results() {
  const { id } = useParams();
  const { state } = useLocation();
  const { qna } = state;
  const { loading, error, answers } = useAnswers(id);
  const calculateResults = useMemo(() => {
    let score = 0;
    answers.forEach((question, index1) => {
      let checkedIndex = [];
      let correctIndex = [];
      question.options.forEach((option, index2) => {
        if (option.correct) {
          correctIndex.push(index2);
        }
        if (qna[index1].options[index2].checked) {
          checkedIndex.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(checkedIndex, correctIndex)) {
        score += 5;
      }
    });
    return score;
  },[answers,qna])
  const userScore = calculateResults;
  return (
    <>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error...</h1>}
      {!loading && !error && answers && answers.length > 0 && (
        <>
          <Summary img={imgSuccess} score={userScore} noq={answers.length * 5} />
          {answers.map((answer, index) => (
            <Question key={index} answer={answer} />
          ))}
          
        </>
      )}
    </>
  );
}
