/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer'
import counterReducer from './reducers/counterReducer'
import { videoReducer } from './reducers/videosReducer';
import { watchReducer } from './reducers/watchReducer';

const reducer=combineReducers({
    auth:authReducer,
    homeVideos:videoReducer,
    watch:watchReducer
})

const store= createStore(reducer,undefined,composeWithDevTools(applyMiddleware(thunk)));

export default store;

