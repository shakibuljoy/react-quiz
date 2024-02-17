import { get, getDatabase, orderByKey, query, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
export default function useAnswers(videoId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    async function fetchAnswers() {
      // Database related settings
      const db = getDatabase();
      const ansersRef = ref(db, "answers/" + videoId + "/questions/");
      const answerQuery = query(ansersRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        // request firebase database
        const snapshot = await get(answerQuery);
        if (snapshot.exists()) {
          await setAnswers([...Object.values(snapshot.val())]);
          // setQuestions((prevQuestions) => {
          //   return [...prevQuestions, ...Object.values(snapshot.val())];
          // });
          setLoading(false);
          setError(false);
        }
      } catch (err) {
        console.log(err.message);
        setLoading(false);
        setError(true);
      }
    }
    fetchAnswers();
  }, [videoId]);
  return {
    loading,
    error,
    answers,
  };
}
