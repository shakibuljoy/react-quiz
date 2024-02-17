import { useEffect } from "react";
import { useState } from "react";

export default function useFetch(url, method, headers) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function requestFetch() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(url, {
          method: method || "GET",
          headers: headers,
        });

        if (response.ok) {
          const data = await response.json();
          setLoading(false);
          setResult(data);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    }
    requestFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    loading,
    error,
    result,
  };
}
