import React, { useEffect, useState } from 'react';
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

const AddSongToPlaylistScreen = ({ history, match }) => {
    const playlistId = match.params.id;

    const dispatch = useDispatch();

    const playlistDetails = useSelector((state) => state.playlistDetails);
    const {
        loading,
        error,
        playlist: { _id: id, playlistName, playlistSongs },
    } = playlistDetails;

    const [name, setName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState('');
    const [filteredSong, setFilteredSong] = useState([]);
    const [addToPlaylist, setAddToPlaylist] = useState([]);

    useEffect(() => {
        if ((playlistId && !playlistSongs) || playlistId !== id) {
            dispatch(getPlaylist(playlistId));
        }
        if (playlistSongs || searchQuery !== '') {
            handleFilter();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, playlistId, playlistName, searchQuery, id]);

    const handleFilter = () => {
        const filterS = playlistSongs.filter((song) =>
            song.title.toLowerCase().includes(searchQuery)
        );
        setFilteredSong(filterS);
        setName(playlistName);

        if (filterS.length === 0) setSearchResults(`No records`);
        else if (filterS.length === 1) setSearchResults(`Found 1 record`);
        else if (filterS.length > 1)
            setSearchResults(`Showing ${filterS.length} records`);
    };

    const savePlaylistAction = () => {
        const updatedPlaylist = {
            playlistName: name,
            playlistSongs: filteredSong,
        };
        console.log('updatedPlaylist: ', updatedPlaylist);
        dispatch(updatePlaylists(updatedPlaylist));
        history.push('/playlists');
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleAddPlaylists = (addSongToPlaylist) => {
        setAddToPlaylist([...addToPlaylist, addSongToPlaylist]);
        const newFilter = filteredSong.filter((song) => song._id !== id);
        setFilteredSong(newFilter);
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
                                onChange={(e) => setName(e.target.value)}
                                autoComplete='off'
                                value={name}
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
                        <Button href={`/playlists/:id/edit`} variant='info'>
                            <i className='fas fa-plus'></i> Add song
                        </Button>
                        <Button variant='primary' onClick={savePlaylistAction}>
                            <i className='fas fa-save'></i> Save playlist
                        </Button>
                        <Button href={'/playlists'} variant='dark'>
                            <i className='fas fa-long-arrow-alt-left'></i> Go
                            Back
                        </Button>
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
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Container className='py-3'>
                    {filteredSong ? (
                        filteredSong.map((song, index) => (
                            <Song
                                key={index}
                                song={song}
                                showDelete={false}
                                showAddSong={true}
                                handleAddPlaylists={() =>
                                    handleAddPlaylists(song._id)
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

export default AddSongToPlaylistScreen;
