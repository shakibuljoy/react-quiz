import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
export default function useQuestions(videoId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function fetchQuestions() {
      // Database related settings
      const db = getDatabase();
      const quizRef = ref(db, "quiz/" + videoId + "/questions/");
      const quizQuery = query(quizRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        // request firebase database
        const snapshot = await get(quizQuery);
        if (snapshot.exists()) {
          await setQuestions([...Object.values(snapshot.val())])
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
    fetchQuestions();
  }, [videoId]);
  return {
    loading,
    error,
    questions,
  };
}
