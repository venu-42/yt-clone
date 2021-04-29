import { ADD_SUBSCRIPTION, WATCH_CHANNEL_FAIL, WATCH_CHANNEL_LOADING, WATCH_CHANNEL_SUCCESS, WATCH_COMMENTS_FAIL, WATCH_COMMENTS_LOADING, WATCH_COMMENTS_SUCCESS, WATCH_REL_VIDEO_FAIL, WATCH_REL_VIDEO_LOADING, WATCH_REL_VIDEO_SUCCESS, WATCH_VIDEO_FAIL, WATCH_VIDEO_LOADING, WATCH_VIDEO_SUCCESS } from "../actionTypes";

const initialState={
    present_video:{
        loading:false,
        body:null,
        error:null
    },
    rel_videos:{
        loading:null,
        body:null,
        error:null
    },
    channelDetails:{
        loading:true,
        body:null,
        error:null
    },
    videoComments:{
        loading:true
    },
    subscriptionId:null
}


export const watchReducer=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case WATCH_VIDEO_SUCCESS:
            return {
                ...state,
                present_video:{
                    ...state.present_video,
                    body:payload,
                    loading:false
                }
            }
        case WATCH_VIDEO_FAIL:
            return{
                ...state,
                present_video:{
                    ...state.present_video,
                    error:payload,
                    loading:false
                }
                
            }
        case WATCH_VIDEO_LOADING:
            return{
                ...state,
                present_video:{
                    ...state.present_video,
                    loading:true
                }
                
            }
        case WATCH_CHANNEL_SUCCESS:
            return{
                ...state,
                channelDetails:{
                    body:payload,
                    loading:false
                }
            }
        case WATCH_CHANNEL_FAIL:
            return{
                ...state,
                channelDetails:{
                    error:payload,
                    loading:false
                }
            }
        case WATCH_CHANNEL_LOADING:
            return{
                ...state,
                channelDetails:{
                    loading:true,
                }
            }
        case WATCH_COMMENTS_SUCCESS:
            return{
                ...state,
                videoComments:{
                    ...state.videoComments,
                    body:payload.items,
                    nextPageToken:payload.nextPageToken,
                    loading:false,
                    videoId:payload.videoId
                }
            }
        case WATCH_COMMENTS_FAIL:
            return{
                ...state,
                videoComments:{
                    ...state.videoComments,
                    error:payload,
                    loading:false
                }
            }
        case WATCH_COMMENTS_LOADING:
            let body=payload?null:state.videoComments.body
            return {
                ...state,
                videoComments:{
                    ...state.videoComments,
                    loading:true,
                    body:body
                }
            }
        case WATCH_REL_VIDEO_LOADING:
            let videosBody=payload?null:state.rel_videos.body
            return{
                ...state,
                rel_videos:{
                    ...state.rel_videos,
                    loading:true,
                    body:videosBody
                }
            }
        case WATCH_REL_VIDEO_SUCCESS:
            return {
                ...state,
                rel_videos:{
                    ...state.rel_videos,
                    loading:false,
                    body:payload.items,
                    nextPageToken:payload.nextPageToken
                }
            }
        case WATCH_REL_VIDEO_FAIL:
            return{
                ...state,
                rel_videos:{
                    ...state.rel_videos,
                    loading:false,
                    error:payload
                }
            }
        case ADD_SUBSCRIPTION:
            return{
                ...state,
                subscriptionId:payload
            }
        default:
            return state;
    }
}