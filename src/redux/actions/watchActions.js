import axios from "../../axios";
import { WATCH_REL_VIDEO_LOADING,WATCH_CHANNEL_SUCCESS,WATCH_CHANNEL_LOADING,WATCH_COMMENTS_SUCCESS,WATCH_COMMENTS_LOADING,WATCH_CHANNEL_FAIL, WATCH_VIDEO_FAIL, WATCH_VIDEO_LOADING, WATCH_VIDEO_SUCCESS, WATCH_MORE_COMMENTS_SUCCESS, WATCH_MORE_COMMENTS_LOADING, WATCH_REL_VIDEO_FAIL, WATCH_REL_VIDEO_SUCCESS } from "../actionTypes"
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
    let clearLoading=false
    if(getState().watch.videoComments?.videoId!==videoId){
        clearLoading=true
    }
    dispatch({
        type:WATCH_COMMENTS_LOADING,
        payload:clearLoading
    })
    axios.get('/commentThreads',{
        params:{
            part:'id,snippet,replies',
            videoId,
            pageToken:getState().watch.videoComments.nextPageToken
        }
    })
    .then(res=>{
        console.log('Comments received !!',res);
        let items = res.data.items;
        console.log('checking diff. comments',getState().watch.videoComments?.videoId,videoId)
        
        if(getState().watch.videoComments?.body?.length){
            items=[...getState().watch.videoComments?.body,...items]
            console.log(items.length)
        }
        dispatch({
            type:WATCH_COMMENTS_SUCCESS,
            payload:{
                items,
                nextPageToken:res.data.nextPageToken,
                videoId
            }
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


export const getRelVideos= (videoId)=>(dispatch,getState)=>{
    console.log('in getRelVIdeos action')
    let clearLoading=false
    if(getState().watch.videoComments?.videoId!==videoId){
        clearLoading=true
    }
    dispatch({
        type:WATCH_REL_VIDEO_LOADING,
        payload:clearLoading
    });

    axios
    .get('/search',{
        params:{
            part:'snippet',
            relatedToVideoId:videoId,
            pageToken:getState().watch.rel_videos.nextPageToken,
            type:'video',
            maxResults:10
        }
    })
    .then((res)=>{
        console.log('getrelvideos',res);
        let items=getState().watch.rel_videos.body;
        let pageToken=res.data.nextPageToken;
        if(items?.length){
            if(res.data.items.length==0){
                pageToken=null;
            }
            items = [...items,...res.data.items]
        }
        else{
            items=res.data.items;
        }
        dispatch({
            type:WATCH_REL_VIDEO_SUCCESS,
            payload:{
                items,
                nextPageToken:pageToken
            }
        })
    })
    .catch((err)=>{
        console.log(err);
        dispatch({
            type:WATCH_REL_VIDEO_FAIL,
            payload:err.response
        })
    })
}