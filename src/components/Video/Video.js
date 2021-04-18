/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./_video.scss";
import moment from "moment";
import numeral from "numeral";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCategoryVideos,
  getHomeVideos,
} from "../../redux/actions/videoActions";
import axios from "../../axios";

import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteCustomScroll from "../InfiniteScroll/InfiniteScroll";

const Videos = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.homeVideos.category);
  const videos = useSelector((state) => state.homeVideos.videos);
  useEffect(() => {
    dispatch(getHomeVideos());
    // setTimeout(() => dispatch(getCategoryVideos("buttabomma")), 2000);
  }, [dispatch]);

  const fetchData = () => {
    console.log("calling after pagination");
    setTimeout(() => {
      if (category === "All") {
      dispatch(getHomeVideos());
    } else {
      dispatch(getCategoryVideos(category));
    }
    }, 1000);
    
  };

  return (
    <div className="vdeo__section">
      <InfiniteCustomScroll length={videos.length} fetchData={fetchData}>
        {videos?.map((video) => {
          return <VideoContainer video={video} key={video.id?.videoId||video.id} />;
        })}
      </InfiniteCustomScroll>
    </div>
  );
};

export default Videos;

const VideoContainer = ({ video }) => {
  const {
    id,
    snippet: {
      publishedAt,
      channelTitle,
      channelId,
      title,
      description,
      thumbnails: { medium },
    },
  } = video;
  const [channelImg, setChannelImg] = useState("");
  const [duration, setDuration] = useState(null);
  const [views, setViews] = useState(null);
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  const getChannelIcon = () => {
    axios
      .get("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      })
      .then((res) => {
        // console.log(res);
        const {
          data: { items },
        } = res;
        setChannelImg(items[0].snippet.thumbnails.default.url);
      })
      .catch((err) => console.log(err.message));
  };
  const getvideoDetails = () => {
    axios
      .get("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id?.videoId || id,
        },
      })
      .then((res) => {
        // console.log("content+stats", res);
        const {
          data: { items },
        } = res;
        setViews(items[0].statistics.viewCount);
        setDuration(items[0].contentDetails.duration);
      });
  };
  useEffect(getChannelIcon);
  useEffect(getvideoDetails);

  return (
    <div className="video__container">
      <div className="video__thumbnail">
        <img src={medium.url} alt="thumbnail" />
        <span className="video__duration">{_duration}</span>
      </div>
      <div className="video__details">
        <div className="video__channelimg">
          <img src={channelImg} alt="channelimg" />
        </div>
        <div className="video__content">
          <h5 className="video__title">{title}</h5>
          <p className="channel__name">{channelTitle}</p>
          <p className="views__time">
            {numeral(views).format("0.a")} views &nbsp;|&nbsp;{" "}
            {moment(publishedAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};
