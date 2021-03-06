import * as actionTypes from '../actionTypes';

import auth,{googleProvider} from '../../firebase';


export const login=()=> dispatch =>{
    // console.log('in login handler')
    googleProvider.addScope('https://www.googleapis.com/auth/youtube.force-ssl')
    auth.signInWithPopup(googleProvider)
    .then(res=>{
        console.log(res,'login res');
        const accessToken=res.credential.accessToken;
        const name=res.additionalUserInfo.profile.name;
        dispatch({
            type:actionTypes.LOGIN,
            payload:{
                name,
                accessToken,
                photoURL:res.user.photoURL
            }
        })
        localStorage.setItem('ytc-user',JSON.stringify({name,accessToken,photoURL:res.user.photoURL}));
    })
    .catch(err=>console.log(err.message));
}

export const logout=()=>dispatch=>{
    auth.signOut()
    .then((res)=>{
        dispatch({
            type:actionTypes.LOGOUT
        })
        localStorage.removeItem('ytc-user');
    })
}