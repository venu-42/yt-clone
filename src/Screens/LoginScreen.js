/* eslint-disable no-unused-vars */
import React from 'react'
import './_screens.scss'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { decrease, increase } from '../redux/actions/counterActions';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const loginHandler=()=>{
        dispatch(login())
    }

    return (
        <div className='loginScreen__container'>
            {/* <CounterScreen /> */}
            <div className="google__auth-btn" onClick={loginHandler} >
                <p>SignUp with</p>&nbsp;&nbsp;
                <img src="https://pngimg.com/uploads/google/google_PNG19635.png" alt="g-png" width='40'/>
            </div>
        </div>
    )
}

export default LoginScreen

const CounterScreen = ()=>{
    const count = useSelector(state=>state.counter.counter);
    const dispatch = useDispatch()
    const incHandler=()=>{
        dispatch(increase(10));
    }
    const decHandler=()=>{
        dispatch(decrease(10));
    }
    return(
    <> 
        <button style={{padding:'10px',fontSize:'20px'}} onClick={incHandler}>+</button>
        <span style={{color:'white'}}>{count}</span>
        <button style={{padding:'10px',fontSize:'20px'}} onClick={decHandler}>-</button>
    </>
    )
}