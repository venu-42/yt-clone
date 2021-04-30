import {LOGIN,LOGOUT} from '../actionTypes';
const initailState = {
    user:JSON.parse(localStorage.getItem('ytc-user'))
}

const authReducer=(state=initailState,action)=>{
    // console.log(state,"action:"+action.type)
    const {type,payload} = action;
    switch(type){
        case LOGIN:
            return{
                user:payload
            }
        case LOGOUT:
            return {
                user:null
            }
        default:
            return state;
    }
};

export default authReducer;