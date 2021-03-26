import axios from 'axios';
import {
    PLAYLIST_LIST_REQUEST,
    PLAYLIST_LIST_SUCCESS,
    PLAYLIST_LIST_FAIL,
    PLAYLIST_CREATE_FAIL,
    PLAYLIST_CREATE_REQUEST,
    PLAYLIST_CREATE_SUCCESS,
    PLAYLIST_DETAILS_REQUEST,
    PLAYLIST_DETAILS_FAIL,
    PLAYLIST_DETAILS_SUCCESS,
    PLAYLIST_DELETE_FAIL,
    PLAYLIST_DELETE_REQUEST,
    PLAYLIST_DELETE_SUCCESS,
    PLAYLIST_UPDATE_FAIL,
    PLAYLIST_UPDATE_REQUEST,
    PLAYLIST_UPDATE_SUCCESS,
} from '../constants/playlistConstants';
import { logout } from './userActions';

export const getAllPlaylists = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PLAYLIST_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const data = await axios.get('/api/playlists', config);

        dispatch({
            type: PLAYLIST_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PLAYLIST_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getPlaylist = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PLAYLIST_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/playlists/${id}`, config);
        console.log('Get playlist: ', data);

        dispatch({
            type: PLAYLIST_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PLAYLIST_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createPlaylists = (newPlaylist) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PLAYLIST_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            '/api/playlists',
            newPlaylist,
            config
        );
        console.log('New Playlist', data);
        dispatch({
            type: PLAYLIST_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PLAYLIST_CREATE_FAIL,
            payload: message,
        });
    }
};

export const updatePlaylists = (updatePlaylist) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: PLAYLIST_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/playlists/${updatePlaylists._id}`,
            updatePlaylists,
            config
        );

        dispatch({
            type: PLAYLIST_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PLAYLIST_UPDATE_FAIL,
            payload: message,
        });
    }
};

export const deletePlaylist = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PLAYLIST_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/playlists/${id}`, config);

        dispatch({
            type: PLAYLIST_DELETE_SUCCESS,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PLAYLIST_DELETE_FAIL,
            payload: message,
        });
    }
};
