import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import Video from "./Video";
export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);
  return (
    <div>
      {!loading && videos.length === 0 && <h1>No videos found!</h1>}
      <InfiniteScroll
        dataLength={videos.length} //This is important field to render the next data
        next={() => setPage(page + 8)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {videos.map((video, index) =>
          video.noq ? (
            <Link to={`quiz/${video.youtubeID}`} state={{videoTitle: video.title}} key={index}>
              <Video title={video.title} noq={video.noq} id={video.youtubeID} />
            </Link>
          ) : (
            <Video
              key={index}
              title={video.title}
              noq={video.noq}
              id={video.youtubeID}
            />
          )
        )}
      </InfiniteScroll>
    </div>
  );
}
