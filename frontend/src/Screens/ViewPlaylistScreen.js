import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    ButtonGroup,
    InputGroup,
    FormControl,
    Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SearchBox from '../components/SearchBox';
import Song from '../components/Song';
import { getPlaylist, updatePlaylists } from '../actions/playlistActions';
import { listSongs } from '../actions/songActions';
import { PLAYLIST_DETAILS_RESET } from '../constants/playlistConstants';

const ViewPlaylistScreen = ({ history, match }) => {
    // const playlistId = match.params.id;
    const playlistId = match.params.id;

    const dispatch = useDispatch();
    // dispatch(getPlaylist(playlistId));

    const playlistDetails = useSelector((state) => state.playlistDetails);
    const {
        loading,
        error,
        playlist: { _id: id, playlistName, playlistSongs },
    } = playlistDetails;

    const songList = useSelector((state) => state.songList);
    const {
        loading: allSongsLoading,
        error: allSongsError,
        songs: allSongs,
    } = songList;

    const [name, setName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState('');
    const [filteredSong, setFilteredSong] = useState([]);
    const [listAllSongFlag, setListAllSongFlag] = useState(false);
    const [addToPlaylist, setAddToPlaylist] = useState([]);

    useEffect(() => {
        console.log('Re-rendering');
        if (playlistId !== id) {
            dispatch(getPlaylist(playlistId));
        }
        if (allSongs.length === 0) {
            dispatch(listSongs());
        }
        if (playlistSongs || searchQuery !== '') {
            if (listAllSongFlag) {
                // console.log('Passing all songs: ', allSongs);
                // setFilteredSong(allSongs);
                // removeExistingPlaylistSongs(allSongs);

                handleFilter(setFlags(allSongs));
            } else {
                // console.log('Passing playlist Songs: ', playlistSongs);
                handleFilter(playlistSongs);
                setAddToPlaylist(playlistSongs);
            }
        }
        setName(playlistName);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        dispatch,
        playlistId,
        playlistName,
        searchQuery,
        id,
        listAllSongFlag,
        history,
    ]);

    const handleFilter = (songarr) => {
        // console.log('songarr: ', songarr);
        const filterS = songarr.filter((song) =>
            song.title.toLowerCase().includes(searchQuery)
        );
        setFilteredSong(filterS);
        // setName(playlistName);

        if (filterS.length === 0) setSearchResults(`No records`);
        else if (filterS.length === 1) setSearchResults(`Found 1 record`);
        else if (filterS.length > 1)
            setSearchResults(`Showing ${filterS.length} records`);
    };

    const setFlags = (arrSongs) => {
        let output = [...arrSongs];
        filteredSong.map((e, i) => {
            output = output.filter((song) => song._id !== filteredSong[i]._id);
        });
        return output;
    };
    const removeExistingPlaylistSongs = (arrSongs) => {
        let arraySongs = arrSongs;
        filteredSong.map((e, i) => {
            arraySongs = arraySongs.filter(
                (song) => song._id !== filteredSong[i]._id
            );
        });

        console.log('arraySongs: ', arraySongs);

        setFilteredSong(arraySongs);
    };

    const savePlaylistAction = () => {
        let updatedPlaylist = {};
        if (listAllSongFlag) {
            console.log('ADD SAVE');
            updatedPlaylist = {
                playlistName: name,
                playlistSongs: [...addToPlaylist],
            };
        } else {
            console.log('DELETE SAVE');
            updatedPlaylist = {
                playlistName: name,
                playlistSongs: [...filteredSong],
            };
        }
        console.log('updatedPlaylist: ', updatedPlaylist);

        dispatch(updatePlaylists(playlistId, updatedPlaylist));
        // dispatch({ type: PLAYLIST_DETAILS_RESET });
        history.push('/playlists');
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleDelete = (id) => {
        const newFilter = filteredSong.filter((song) => song._id !== id);
        setFilteredSong(newFilter);
        setListAllSongFlag(false);
    };

    const shuffleArray = (songs) => {
        if (songs.length > 1) {
            for (var i = songs.length - 1; i > 0; i--) {
                // Generate random number
                var j = Math.floor(Math.random() * (i + 1));

                var temp = songs[i];
                songs[i] = songs[j];
                songs[j] = temp;
            }
            setFilteredSong([...songs]);
        }
    };

    const handleAddPlaylists = (addSongToPlaylist) => {
        setAddToPlaylist([...addToPlaylist, addSongToPlaylist]);
        const newFilter = filteredSong.filter(
            (song) => song._id !== addSongToPlaylist._id
        );
        console.log('New filtered list: ', newFilter);
        setFilteredSong([...newFilter]);
    };

    return (
        <Container>
            <div className='row no-gutters mb-3'>
                <div className='col-sm-10 px-3'>
                    <h3>
                        <InputGroup className='mb-3'>
                            <InputGroup.Prepend>
                                <InputGroup.Text id='playlist-name'>
                                    Playlist Name
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type='text'
                                className='form-control'
                                name='name'
                                id='name'
                                placeholder='Enter your playlist name'
                                autoFocus=''
                                value={name || ''}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete='off'
                            />
                        </InputGroup>
                    </h3>
                </div>
                <div className='col-sm-8'>
                    <ButtonGroup aria-label='list type' className='d-flex px-3'>
                        <Button
                            variant='warning'
                            onClick={() => shuffleArray(filteredSong)}>
                            <i className='fas fa-random'></i> Shuffle playlist
                        </Button>
                        <Button
                            variant='info'
                            onClick={() => setListAllSongFlag(true)}
                            disabled={listAllSongFlag ? true : false}>
                            <i className='fas fa-plus'></i> Add song
                        </Button>
                        <Button variant='primary' onClick={savePlaylistAction}>
                            <i className='fas fa-save'></i> Save playlist
                        </Button>
                        {/* <Button href={'/playlists'} variant='dark'>
                            <i className='fas fa-long-arrow-alt-left'></i> Go
                            Back
                        </Button> */}
                    </ButtonGroup>
                </div>
            </div>
            <div className='col-sm-12  d-flex justify-content-center'>
                <div className='col-sm-8'>
                    <SearchBox
                        searchBoxText={searchQuery}
                        searchBoxChange={handleSearch}
                    />
                    {searchQuery ? (
                        <div style={{ float: 'right', paddingBottom: '1%' }}>
                            {searchResults}
                        </div>
                    ) : null}
                </div>
            </div>
            {loading ? (
                <Loader />
            ) : allSongsLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : allSongsError ? (
                <Message variant='danger'>{allSongsError}</Message>
            ) : (
                <Container className='py-3'>
                    {filteredSong ? (
                        filteredSong.map((song, index) => (
                            <Song
                                key={index}
                                song={song}
                                showDelete={listAllSongFlag ? false : true}
                                showAddSong={listAllSongFlag ? true : false}
                                handleAddPlaylists={() =>
                                    handleAddPlaylists(song)
                                }
                                removeSongFromPlaylist={() =>
                                    handleDelete(song._id)
                                }
                            />
                        ))
                    ) : (
                        <strong>No songs in playlist</strong>
                    )}
                </Container>
            )}
        </Container>
    );
};

export default ViewPlaylistScreen;
