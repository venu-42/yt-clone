import { LIKED_VIDEOS_FAIL, LIKED_VIDEOS_LOADING, LIKED_VIDEOS_SUCCESS } from "../actionTypes";

const initialstate = {
  loading: false,
  body: null,
  error: null,
};

export const likedReducer = (state = initialstate, action) => {
  const { type, payload } = action;
  switch(type){
    case LIKED_VIDEOS_LOADING:
        return{
            ...state,
            loading:true
        }
    case LIKED_VIDEOS_SUCCESS:
        return{
            ...state,
            loading:false,
            body:payload.items,
            nextPageToken:payload.nextPageToken
        }
    case LIKED_VIDEOS_FAIL:
        return{
            ...state,
            loading:false,
            error:payload
        }
    default:
        return state;
  }
};
