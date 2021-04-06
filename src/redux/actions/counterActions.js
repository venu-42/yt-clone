import * as actionTypes from '../actionTypes';

export const increase=(offset)=>dispatch =>{
    dispatch({
        type:actionTypes.INC_COUNTER,
        payload:offset
    })
}

export const decrease=(offset)=>dispatch=>{
    dispatch({
        type:actionTypes.DEC_COUNTER,
        payload:offset
    })
}