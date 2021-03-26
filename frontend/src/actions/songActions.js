import axios from 'axios';
import {
    SONG_LIST_REQUEST,
    SONG_LIST_SUCCESS,
    SONG_LIST_FAIL,
} from '../constants/songConstants';

export const listSongs = () => async (dispatch) => {
    try {
        dispatch({ type: SONG_LIST_REQUEST });

        const data = await axios.get('/api/songs');
        // console.log(data);
        dispatch({
            type: SONG_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SONG_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listFilteredSongs = (playlist) => async (dispatch) => {
    try {
        dispatch({ type: SONG_LIST_REQUEST });

        let data = await axios.get('/api/songs');
        // console.log(data);

        data = data.filter((e) => e._id === playlist._id);
        dispatch({
            type: SONG_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SONG_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
