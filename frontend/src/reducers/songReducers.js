import {
    SONG_LIST_REQUEST,
    SONG_LIST_SUCCESS,
    SONG_LIST_FAIL,
} from '../constants/songConstants';

export const songListReducer = (state = {}, action) => {
    switch (action.type) {
        case SONG_LIST_REQUEST:
            return { loading: true };
        case SONG_LIST_SUCCESS:
            return {
                loading: false,
                songs: action.payload.data,
                // pages: action.payload.pages,
                // page: action.payload.page,
            };
        case SONG_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
