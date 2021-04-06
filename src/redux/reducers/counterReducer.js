import * as actionTypes from '../actionTypes';

const counterReducer =(state={counter:0},action)=>{
    console.log(state);
    switch(action.type){
        case actionTypes.INC_COUNTER:
            return {
                ...state,
                counter:state.counter+action.payload
            }
        case actionTypes.DEC_COUNTER:
            return {
                ...state,
                counter:state.counter-action.payload
            }
        default:
            return state;
    }
}

export default counterReducer;