import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./_watchScreen.scss";
import { BiLike, BiDislike, RiShareForwardLine } from "react-icons/all";
import axios from "../../axios";
import { getChannelDetails, getRelVideos, getVideoComments, getWatchVideo } from "../../redux/actions/watchActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import numeral from "numeral";
import { isSubscribedFn, Subscribe, Unsubscribe } from "../../UtilFunctions";
import InfiniteCustomScroll from "../../components/InfiniteScroll/InfiniteScroll";
import { useHistory } from "react-router";
import {Helmet} from 'react-helmet'

const WatchScreen = ({ match }) => {
  const {
    params: { videoId },
  } = match;
  const [showDesc, setShowDesc] = useState(false);
  const dispatch = useDispatch();



  // ---selectors--
  const present_video = useSelector((state) => state.watch.present_video);
  const channelDetails = useSelector(state=>state.watch.channelDetails);
  const videoComments = useSelector(state=>state.watch.videoComments.body);
  const videoCommentsObj = useSelector(state=>state.watch.videoComments);
  const rel_videos = useSelector(state=>state.watch.rel_videos.body)
  const rel_videosObj = useSelector(state=>state.watch.rel_videos)
  const subscriptionId =useSelector(state=>state.watch.subscriptionId);

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
      isSubscribedFn(channelId)
      dispatch(getChannelDetails(channelId));
    }
  }, [channelId,dispatch]);

  useEffect(()=>{
    console.log('fetching rel_viedos');
    dispatch(getRelVideos(videoId));
  },[videoId,dispatch])

  useEffect(()=>{
    dispatch(getVideoComments(videoId));
  },[videoId,dispatch])


  // useEffect(()=>{
  //   dispatch(getVideoComments(videoId));
  // },[dispatch,videoId])

  // ----Handlers----
  const SubscribeHandler = () => {
    if (!subscriptionId) {
      Subscribe(channelId)
      .catch((err) =>{
        console.log(err, 'error in subscribing channel');
      })
    } else {
        Unsubscribe()
    }
  };

  let fetchingDelay=2000
  const fetchComments = ()=>{
    console.log('in fetch comments')
    setTimeout(()=>{
      dispatch(getVideoComments(videoId));
    },fetchingDelay)
    
  }
  const fetchRelVideos= ()=>{
    console.log('fetching rel videos')
    setTimeout(()=>{
      dispatch(getRelVideos(videoId));
    },fetchingDelay)
  }
  return (
    <>
      <div className="watch__container">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
        <div className="big__video">
          <iframe
            width="100%"
            height="506"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;fullscreen;"
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
              &nbsp;{numeral(likeCount).format('0.0a')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <BiDislike /> {numeral(dislikeCount).format('0.0a')}&nbsp;&nbsp;&nbsp;&nbsp;
              <RiShareForwardLine />
            </div>
          </div>
          <hr />
          <div className="channel__details">
            <img
              src={`${channelDetails?.body?.snippet.thumbnails.default.url}`}
              alt=""
              className="channel__img"
              onClick={()=>window.open(`/channel/${channelId}`)}
            />&nbsp;
            <a href={`/channel/${channelId}`} className='channel__name'>{channelTitle}</a>
            <p className='subCount'>{numeral(channelDetails?.body?.statistics.subscriberCount).format(0,0)}</p>
            <button
              className={`subscription ${
                subscriptionId ? "subscribed" : "not__subscribed"
              }`}
              onClick={SubscribeHandler}
            >
              Subscribe{subscriptionId ? "d" : ""}
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
            {videoComments?.length&&
            <InfiniteCustomScroll length={videoComments?.length} fetchData={()=>{fetchComments()}} loading={videoCommentsObj.loading} hasMore={videoCommentsObj.nextPageToken?true:false} for1="comments" >
              {
                videoComments?.map(comment=>{
                  return (
                  <VideoComment publishedAt={comment.snippet.topLevelComment.snippet.publishedAt} authorChannelURL={comment.snippet.topLevelComment.snippet.authorChannelUrl} title={comment.snippet.topLevelComment.snippet.authorDisplayName} description={comment.snippet.topLevelComment.snippet.textDisplay} imgURL={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} channelId={comment.snippet.topLevelComment.snippet.authorChannelId.value} />)
                })
              }
            </InfiniteCustomScroll>
            }
          </div>
        </div>
        <div className="related__videos">
          {rel_videos?.length&&
          <InfiniteCustomScroll  length={rel_videos?.length} fetchData={()=>fetchRelVideos()} endMessage={'Thanks for coming. Youtube API allows limited calls so please come back later!!'} hasMore={rel_videos.length<20?(rel_videosObj.nextPageToken?true:false):false} >
            {rel_videos?.map((video,id) => {
              // console.log(video)
              return <RelatedVideo {...video} id1={id} />;
            })}
          </InfiniteCustomScroll>
          }
        </div>
      </div>
    </>
  );
};

export default WatchScreen; 

const RelatedVideo = (props) => {
  // console.log(props)
  let { id:{videoId},id1 }=props;
  const [snippet,setSnippet] = useState({});
  let {publishedAt,title,thumbnails,channelTitle,channelId}=snippet;
  const history = useHistory();


  useEffect(()=>{
    const getVideoSnippet = async ()=>{
      try{
        const res= await axios.get('/videos',{
          params:{
            id:videoId,
            part:'snippet,contentDetails,statistics'
          }
        })
        // console.log('get single rel_video',res);
        // console.log(res);
        setSnippet(res.data.items[0].snippet)
      }
      catch(err){
        // console.log('get single rel_video ERROR',err);
      }
    }
    getVideoSnippet();
  },[videoId])

  if(publishedAt)
  return (
    <div className='related__video' onClick={()=>history.push(`/watch/${videoId}`)} >
      <img src={thumbnails.medium.url} alt="rel_video" className=' cursor-pointer'/>
      <div>
        <h6 className='line__clamp2  cursor-pointer'>{title}</h6>
        <p className="color-gray cursor-pointer"><a href={`/channel/${channelId}`} className="channel__name">{channelTitle}</a></p>
        <p className="color-gray">{moment(publishedAt).fromNow()}</p>
      </div>
    </div>
  );

  return <></>
};

const VideoComment = ({imgURL,title,publishedAt,description,channelId})=>{
  return(
    <div className="comment__box">
      <img src={imgURL} className='channel__img' alt=""/>
      <div className="title__desc">
        <h6 className='comment__title'><a href={`/channel/${channelId}`} className="channel__name">{title}</a> &nbsp; <p className="small__gray d-inline-block">{moment(publishedAt).fromNow()}</p> </h6>
        <p className='comment__description' dangerouslySetInnerHTML={{__html: description}} ></p>
      </div>
    </div>
  )
}