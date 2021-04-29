import { ADD_SUBSCRIPTION, SUBSCRIPTION_FAIL, SUBSCRIPTION_LOADING, SUBSCRIPTION_SUCCESS } from "../actionTypes";

const initialState = {
    body: [],
    loading: false,
    error:null
}
export const subscriptionReducer = (state=initialState,action)=>{
    const {type,payload} = action;
    switch(type){
        case SUBSCRIPTION_LOADING: 
            return{
                ...state,
                loading:true
            }
        case SUBSCRIPTION_SUCCESS:
            return{
                ...state,
                loading:false,
                body:payload.items,
                nextPageToken:payload.nextPageToken
            }
        case SUBSCRIPTION_FAIL:
            return{
                ...state,
                loading:false,
                error:payload
            }
        default:
            return state;
    }
}