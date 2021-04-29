import { SEARCH_FAIL, SEARCH_LOADING, SEARCH_SUCCESS } from "../actionTypes";

const initialState= {
    body:[],
    error:null,
    loading:false
}

export const searchReducer = (state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case SEARCH_LOADING:
            return{
                ...state,
                loading:true
            }
        case SEARCH_SUCCESS:
            return{
                ...state,
                loading:false,
                body:payload.items,
                nextPageToken:payload.nextPageToken,
                keyword:payload.keyword
            }
        case SEARCH_FAIL:
             return{
                ...state,
                loading:false,
                error:payload.error,
                keyword:payload.keyword
            }
        default:
            return state
    }
}