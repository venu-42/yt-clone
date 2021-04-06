import {LOGIN,LOGOUT} from '../actionTypes';
const initailState = {
    user:JSON.parse(localStorage.getItem('ytc-user'))
}

const authReducer=(state=initailState,action)=>{
    console.log(state)
    const {type,payload} = action;
    switch(type){
        case LOGIN:
            let newState={...state};
            let user={...newState.user};
            user=payload;
            newState.user=user;
            return newState;
        case LOGOUT:
            return {
                user:null
            }
        default:
            return state;
    }
};

export default authReducer;