import axios from "../../axios";
import { WATCH_REL_VIDEO_LOADING,WATCH_CHANNEL_SUCCESS,WATCH_CHANNEL_LOADING,WATCH_COMMENTS_SUCCESS,WATCH_COMMENTS_LOADING,WATCH_CHANNEL_FAIL, WATCH_REL_VIDEO_SUCCESS, WATCH_VIDEO_FAIL, WATCH_VIDEO_LOADING, WATCH_VIDEO_SUCCESS, WATCH_MORE_COMMENTS_SUCCESS, WATCH_MORE_COMMENTS_LOADING } from "../actionTypes"
import { logout } from "./authActions";


export const getWatchVideo=(videoId)=>dispatch=>{
    console.log('in dispatch')
    dispatch({
        type:WATCH_VIDEO_LOADING
    });

    axios
    .get("/videos", {
    params: {
        part: "contentDetails,snippet,statistics",
        id: videoId,
    },
    })
    .then((res) => {
    console.log(res);
    dispatch({
        type:WATCH_VIDEO_SUCCESS,
        payload:res.data.items[0]
    })
    })
    .catch(err=>{
        console.log(err.response);
        dispatch({
            type:WATCH_VIDEO_FAIL,
            payload:err.response.data.error.message
        })
        if(err.response.data.error.status==='UNAUTHENTICATED'){
            alert('Please Login Again. Your Session ended');
            dispatch(logout());
        }
    })
}

export const getChannelDetails= (channelId)=>dispatch=>{

    dispatch({
        type:WATCH_CHANNEL_LOADING
    })

    axios.get('/channels',{
        params:{
            part:'snippet,contentDetails,statistics',
            id:channelId
        }
    })
    .then((res)=>{
        console.log(res);
        dispatch({
            type:WATCH_CHANNEL_SUCCESS,
            payload:res.data.items[0]
        })
    })
    .catch(err=>{
        console.log(err.response);
    })
}

export const getVideoComments = (videoId)=>(dispatch,getState)=>{
    dispatch({
        type:WATCH_COMMENTS_LOADING
    })
    axios.get('/commentThreads',{
        params:{
            part:'id,snippet,replies',
            videoId,
            pageToken:getState().watch.videoComments.body?.nextPageToken
        }
    })
    .then(res=>{
        console.log(res);
        let items = res.data.items;
        if(getState().watch.videoComments?.body?.length){
            items=[...getState().watch.videoComments?.body,...items]
        }
        dispatch({
            type:WATCH_COMMENTS_SUCCESS,
            payload:items
        })
    })
    .catch(err=>{
        console.log(err.response);
        dispatch({
            type:WATCH_CHANNEL_FAIL,
            payload:err.response
        })
    })
}


export const getRelVideos= (videoId)=>dispatch=>{
    dispatch({
        type:WATCH_REL_VIDEO_LOADING
    });

    axios
    .get('/search',{
        params:{
            part:'snippet',
            relatedToVideoId:videoId,
            pageToken:''
        }
    })
    .then((res)=>{
        console.log(res);
    })
}