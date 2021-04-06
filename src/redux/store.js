import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer'
import counterReducer from './reducers/counterReducer'

const reducer=combineReducers({
    auth:authReducer
    // counter:counterReducer
})

const store= createStore(reducer,undefined,composeWithDevTools(applyMiddleware(thunk)));

export default store;

