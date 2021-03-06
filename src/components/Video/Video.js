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
import { useHistory } from "react-router";
import { Skeleton } from "@material-ui/lab";

const Videos = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.homeVideos.category);
  const videos = useSelector((state) => state.homeVideos.videos);

  useEffect(() => {
    if(!(videos.length)){
      setTimeout(() =>{
        dispatch(getHomeVideos());
      },[2000])
    }
    
  }, [dispatch]);

  const fetchData = () => {
    console.log("calling after pagination");
    setTimeout(() => {
      if (category === "All") {
      dispatch(getHomeVideos());
    } else {
      dispatch(getCategoryVideos(category));
    }
    }, 2000);
    
  };
  const dummy=['','','','','','','',''];
  const loader=()=>(<><VideoContainerSkeleton/><VideoContainerSkeleton/><VideoContainerSkeleton/><VideoContainerSkeleton/></>)
  return (
    <div className="vdeo__section">
      {!(videos?.length)?
        <div className="d-flex flex-wrap justify-content-around mt-3" style={{rowGap:'20px'}}>
          {
            dummy.map(data=>(
              <VideoContainerSkeleton />
            ))
          }
      </div>:
      <InfiniteCustomScroll length={videos.length} fetchData={fetchData} hasMore={videos.length<30} endMessage={'Thanks for coming. Youtube API allows limited calls so please come back later!!'} loader={loader}>
        {videos?.map((video) => {
          return <VideoContainer video={video} id={video.id?.videoId||video.id} key={video.id?.videoId||video.id} />;
        })
      }
      </InfiniteCustomScroll>}
    </div>
  );
};

export default Videos;

export const VideoContainer = ({ video,id }) => {
  const history=useHistory();
  const {
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
    // console.log('axios called getchannelicon')
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
    // console.log('axios called getvideodetails')
    axios
      .get("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id,
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
  useEffect(getChannelIcon,[id]);
  useEffect(getvideoDetails,[id]);

  return (
    <div className="video__container" >
      <div className="video__thumbnail cursor-pointer" onClick={()=>history.push(`/watch/${id}`)}>
        <img src={medium.url} alt="thumbnail" />
        <span className="video__duration">{_duration}</span>
      </div>
      <div className="video__details">
        <div className="video__channelimg">
          <img className='channel__img' src={channelImg} alt="channelimg" 
              onClick={()=>window.open(`/channel/${channelId}`)}/>
        </div>
        <div className="video__content">
          <h5 className="video__title cursor-pointer" onClick={()=>history.push(`/watch/${id}`)}>{title}</h5>
          <a href={`/channel/${id}`} className="channel__name">{channelTitle}</a>
          <p className="views__time">
            {numeral(views).format("0.a")} views &nbsp;|&nbsp;{" "}
            {moment(publishedAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export const VideoContainerSkeleton = ()=>{
  return(
    <div className="videocontainerskeleton">
      <Skeleton animation="wave" variant="rect" width={'100%'} height={200} />
      <div style={{display:'flex',marginTop:'10px',gap:'20px'}}>
      <Skeleton animation="wave" variant="circle" width={50} height={50} />
      <Skeleton animation="wave" variant="rect" width={'80%'} height={50} />
      </div>
    </div>
  )
}