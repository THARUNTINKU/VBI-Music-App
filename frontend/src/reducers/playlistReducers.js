import {
    PLAYLIST_LIST_REQUEST,
    PLAYLIST_LIST_SUCCESS,
    PLAYLIST_LIST_FAIL,
    PLAYLIST_CREATE_REQUEST,
    PLAYLIST_CREATE_SUCCESS,
    PLAYLIST_CREATE_FAIL,
    PLAYLIST_DETAILS_REQUEST,
    PLAYLIST_DETAILS_FAIL,
    PLAYLIST_DETAILS_SUCCESS,
    PLAYLIST_DETAILS_RESET,
    PLAYLIST_DELETE_FAIL,
    PLAYLIST_DELETE_REQUEST,
    PLAYLIST_DELETE_SUCCESS,
} from '../constants/playlistConstants';

export const playlistReducer = (state = { allPlaylists: [] }, action) => {
    switch (action.type) {
        case PLAYLIST_LIST_REQUEST:
            return { loading: true, allPlaylists: [] };
        case PLAYLIST_LIST_SUCCESS:
            return {
                loading: false,
                allPlaylists: action.payload.data,
            };
        case PLAYLIST_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const playlistDetailsReducer = (state = { playlist: {} }, action) => {
    switch (action.type) {
        case PLAYLIST_DETAILS_REQUEST:
            return { ...state, loading: true };
        case PLAYLIST_DETAILS_SUCCESS:
            return { loading: false, playlist: action.payload };
        case PLAYLIST_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case PLAYLIST_DETAILS_RESET:
            return {};
        default:
            return state;
    }
};

export const playlistsCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PLAYLIST_CREATE_REQUEST:
            return {
                loading: true,
            };
        case PLAYLIST_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case PLAYLIST_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const playlistsDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PLAYLIST_DELETE_REQUEST:
            return { loading: true };
        case PLAYLIST_DELETE_SUCCESS:
            return { loading: false, success: true };
        case PLAYLIST_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
