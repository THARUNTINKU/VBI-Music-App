import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { songListReducer } from './reducers/songReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import {
    playlistReducer,
    playlistsCreateReducer,
    playlistsDeleteReducer,
    playlistDetailsReducer,
} from './reducers/playlistReducers';

const reducer = combineReducers({
    songList: songListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    playlists: playlistReducer,
    playlistCreate: playlistsCreateReducer,
    playlistDetails: playlistDetailsReducer,
    playlistDelete: playlistsDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
