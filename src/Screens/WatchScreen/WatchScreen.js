import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./_watchScreen.scss";
import { BiLike, BiDislike, RiShareForwardLine } from "react-icons/all";
import axios from "../../axios";
import { getChannelDetails, getVideoComments, getWatchVideo } from "../../redux/actions/watchActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import numeral from "numeral";
import { isSubscribedFn, Subscribe } from "../../UtilFunctions";
import InfiniteCustomScroll from "../../components/InfiniteScroll/InfiniteScroll";

const WatchScreen = ({ match }) => {
  const {
    params: { videoId },
  } = match;
  const [showDesc, setShowDesc] = useState(false);
  const dispatch = useDispatch();

  const relatedvideos = ["", "", "", "", "", ""];


  // ---selectors--
  const present_video = useSelector((state) => state.watch.present_video);
  const channelDetails = useSelector(state=>state.watch.channelDetails);
  const videoComments = useSelector(state=>state.watch.videoComments.body);
  


  console.log(present_video);
  let title,
    channelTitle,
    description,
    commentCount,
    dislikeCount,
    likeCount,
    viewCount,
    publishedAt,
    channelId = null,
    duration;
  const [isSubscribed, setIsSubscribed] = useState(false);
  if (present_video.body) {
    ({
      snippet: { title, channelTitle, description, publishedAt, channelId },
      statistics: { commentCount, dislikeCount, likeCount, viewCount },
      contentDetails: { duration },
    } = present_video.body);
  }

  useEffect(() => {
    console.log("in useeffect");
    dispatch(getWatchVideo(videoId));
  }, [videoId, dispatch]);

  useEffect(() => {
    if (channelId) {
      isSubscribedFn(channelId).then((res) => {
        if (res.data.items.length) setIsSubscribed(true);
      });
      dispatch(getChannelDetails(channelId));
    }
  }, [channelId,dispatch]);

  // useEffect(()=>{
  //   dispatch(getVideoComments(videoId));
  // },[dispatch,videoId])

  // ----Handlers----
  const SubscribeHandler = () => {
    if (!isSubscribed) {
      Subscribe().then((res) => {
        isSubscribedFn(channelId).then((res) => {
          // console.log(res);
          if (res.data.items.length) setIsSubscribed(true);
        });
      });
    } else {
    }
  };

  const fetchComments = (videoId)=>{
    setTimeout(()=>{
      dispatch(getVideoComments(videoId));
    },1500)
    
  }

  return (
    <>
      <Header />
      <div className="watch__container">
        <div className="big__video">
          <iframe
            width="100%"
            height="506"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;fullscreen"
            allowfullscreen
          ></iframe>
          <div className="title">{title}</div>
          <div className="stats">
            <p className="left__part">
              {numeral(viewCount).format("0,0")} views &nbsp;•&nbsp;{" "}
              {moment(publishedAt).format("D/M/yyyy")}
            </p>
            <div className="right__part">
              <BiLike />
              &nbsp;{likeCount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <BiDislike /> {dislikeCount}&nbsp;&nbsp;&nbsp;&nbsp;
              <RiShareForwardLine />
            </div>
          </div>
          <hr />
          <div className="channel__details">
            <img
              src={`${channelDetails?.body?.snippet.thumbnails.default.url}`}
              alt=""
              className="channel__img"
            />
            <p>{channelTitle}</p>
            <p className='subCount'>{numeral(channelDetails?.body?.statistics.subscriberCount).format(0,0)}</p>
            <button
              className={`subscription ${
                isSubscribed ? "subscribed" : "not__subscribed"
              }`}
              onClick={SubscribeHandler}
            >
              Subscribe{isSubscribed ? "d" : ""}
            </button>
          </div>
          <hr />
          <div>
            <h5 className="desc__heading">Description</h5>
            <p
              className={`video__description ${
                !showDesc && "line-clamp__description"
              }`}
            >
              {description}
            </p>
            <p
              className='small__gray cursor-pointer'
              onClick={() => setShowDesc(!showDesc)}
            >
              show {showDesc ? "less" : "more"}
            </p>
          </div>
          <hr />
          <div className="comments">
            <h5>Comments &nbsp; {commentCount}</h5>
            <InfiniteCustomScroll length={videoComments?videoComments.length:0} fetchData={()=>fetchComments(videoId)}>
              {
                videoComments?.map(comment=>{
                  return (
                  <VideoComment publishedAt={comment.snippet.topLevelComment.snippet.publishedAt} authorChannelURL={comment.snippet.topLevelComment.snippet.authorChannelUrl} title={comment.snippet.topLevelComment.snippet.authorDisplayName} description={comment.snippet.topLevelComment.snippet.textDisplay} imgURL={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} />)
                })
              }
            </InfiniteCustomScroll>
          </div>
        </div>
        <div className="related__videos">
          {relatedvideos.map((video) => {
            return <RelatedVideo />;
          })}
        </div>
      </div>
    </>
  );
};

export default WatchScreen;

const RelatedVideo = ({ video }) => {
  return <h1>rel.video</h1>;
};

const VideoComment = ({imgURL,title,publishedAt,description})=>{
  return(
    <div className="comment__box">
      <img src={imgURL} className='channel__img' alt=""/>
      <div className="title__desc">
        <h6 className='comment__title'><b>{title}</b> &nbsp; <p className="small__gray d-inline-block">{moment(publishedAt).fromNow()}</p> </h6>
        <p className='comment__description' dangerouslySetInnerHTML={{__html: description}} ></p>
      </div>
    </div>
  )
}