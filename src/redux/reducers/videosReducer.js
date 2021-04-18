/* eslint-disable no-unused-vars */
import * as types from '../actionTypes';

const prevState={
    videos:[],
    nextPageToken:null,
    loading:true,
    category:'All'
};

export const videoReducer=(state=prevState,action)=>{
    console.log('action called!',action.type);
    const {type,payload} =action;
    switch(type){
        case types.HOME_VIDEOS_SUCCESS:
            
            return {
                ...state,
                videos:[...payload.videos],
                nextPageToken:payload.nextPageToken,
                loading:false,
                category:payload.category
            }
        case types.HOME_VIDEOS_FAIL:
            return {
                ...state,
                loading:false,
                errorMsg:payload
            }
        case types.HOME_VIDEOS_REQUEST:
            return {
                ...state,
                loading:true
            }
        case 'tempChange':
            return{
                ...state,
                videos:[
                    ...state.videos.slice(5,10)
                ]
            }
        default:
            return state;
    }
}