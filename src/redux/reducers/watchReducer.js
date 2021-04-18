import { WATCH_CHANNEL_FAIL, WATCH_CHANNEL_LOADING, WATCH_CHANNEL_SUCCESS, WATCH_COMMENTS_FAIL, WATCH_COMMENTS_LOADING, WATCH_COMMENTS_SUCCESS, WATCH_VIDEO_FAIL, WATCH_VIDEO_LOADING, WATCH_VIDEO_SUCCESS } from "../actionTypes";

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
    }
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
                    body:payload,
                    loading:false
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
            return {
                ...state,
                videoComments:{
                    ...state.videoComments,
                    loading:true
                }
            }
        default:
            return state;
    }
}