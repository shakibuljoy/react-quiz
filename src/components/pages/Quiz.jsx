import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash-es";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useQuestions from "../../hooks/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const initialstate = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      {
        action.value.forEach((question) => {
          question.options.forEach((option) => {
            option.checked = false;
          });
        });
      }
      return action.value;
    case "answer": {
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;
    }
    default:
      return state;
  }
};
export default function Quiz() {
  const {videoTitle} = useLocation().state;
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  const [currentQuestion, setCurrenQuestion] = useState(0);
  const [qna, dispatch] = useReducer(reducer, initialstate);
  const { currentUser } = useAuth();
  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  function handleAnwerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  // handle user cliked to the next button and get the next question
  function handleNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrenQuestion((prevCurrent) => prevCurrent + 1);
    }
  }
  function handlePrev() {
    if (currentQuestion > 0 && currentQuestion < questions.length) {
      setCurrenQuestion((prevCurrent) => prevCurrent - 1);
    }
  }
  const percentage = ((currentQuestion + 1) / questions.length) * 100;
  async function handleSubmit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [id]: qna,
    });
    navigate(`/results/${id}`, {
      state: {
        qna: qna,
      },
    });
  }
  return (
    <>
      {loading && <h1>Loading...</h1>}
      {error && <h1>There was an error! </h1>}
      {!loading && !error && qna && qna.length !== 0 ? (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={qna[currentQuestion].options}
            handleChange={handleAnwerChange}
          />
          <ProgressBar
            handleNext={handleNext}
            handlePrev={handlePrev}
            percentage={percentage}
            handleSubmit={handleSubmit}
          />
          <MiniPlayer
            title={videoTitle}
            id={id}
          />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
