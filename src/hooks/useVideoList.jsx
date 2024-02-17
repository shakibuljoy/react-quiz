import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";
export default function useVideoList(page) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    async function fetchVideos() {
      // Database related settings
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videoQuery = query(
        videosRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(8)
      );

      try {
        setError(false);
        setLoading(true);
        // request firebase database
        const snapshot = await get(videoQuery);
        setLoading(false);
        if (snapshot.exists()) {
          // await setVideos([...Object.values(snapshot.val())])
          setVideos((prevVideos) => {
            return [...prevVideos, ...Object.values(snapshot.val())]
          })
        } else {
          //do something if snapshot not exist
          setHasMore(false);
        }
      } catch (err) {
        console.log(err.message);
        setLoading(false);
        setError(true);
      }
    }
    fetchVideos();
  }, [page]);
  return {
    loading,
    error,
    videos,
    hasMore,
  };
}
