import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import InfiniteCustomScroll from "../components/InfiniteScroll/InfiniteScroll";
import { VideoContainer } from "../components/Video/Video";
import { getLikedvieos } from "../redux/actions/likedvideos.actions";
import { Helmet } from "react-helmet";

const LikedVideos = () => {
  const likedVideos = useSelector((state) => state.likedVideos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLikedvieos());
  }, [dispatch]);
  return (
    <>
      <div className="main-body">
        <Helmet>
          <title>{"Liked Videos"}</title>
        </Helmet>
        {likedVideos.body && (
          <InfiniteCustomScroll
            length={likedVideos.body?.length}
            hasMore={likedVideos.nextPageToken ? true : false}
            fetchData={() => {
              dispatch(getLikedvieos());
            }}
          >
            {likedVideos.body.map((video) => (
              <VideoContainer video={video} key={video.id} id={video.id} />
            ))}
          </InfiniteCustomScroll>
        )}
      </div>
    </>
  );
};

export default LikedVideos;
