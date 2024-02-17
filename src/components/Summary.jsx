import { useMemo } from "react";
import useFetch from "../hooks/useFetch";
import classes from "../styles/Summary.module.css";
export default function Summary({ score, img, noq }) {
  const passMark = useMemo(() => {
    if ((score / noq) * 100 < 50) {
      return "failed";
    } else if ((score / noq) * 100 < 75) {
      return "good";
    } else {
      return "excellent";
    }
  }, [score, noq]);
  console.log(passMark);
  const url = `https://api.pexels.com/v1/search?query=${passMark}&per_page=1`;
  const auth = "5FcxjtNX77e8MbC1SevpZpNDV4VCXZvsAkx9b8NCaaBArqm5rUoDx2Sw";
  const { loading, error, result } = useFetch(url, "GET", {
    Authorization: auth,
  });
  const image = result ? result.photos[0].src.medium : img;
  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        {/* progress bar will be placed here */}
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq}
        </p>
      </div>
      <div className={classes.badge}>
        {loading && <h1>Loading your badge...</h1>}
        {error && <h1>Something went wrong...</h1>}
        {!loading && !error && <img src={image} alt={passMark} />}
      </div>
    </div>
  );
}
