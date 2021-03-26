import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from '../components/SearchBox';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Song from '../components/Song';
import { listSongs } from '../actions/songActions';

const SongScreen = () => {
    const dispatch = useDispatch();

    const songList = useSelector((state) => state.songList);
    const { loading, error, songs = [] } = songList;

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSong, setFilteredSong] = useState([]);
    const [searchResults, setSearchResults] = useState('');

    useEffect(() => {
        if (songs.length === 0 && !error) {
            dispatch(listSongs());
        }
        if (songs.length > 0 || searchQuery !== '') {
            const filterS = songs.filter((song) =>
                song.title.toLowerCase().includes(searchQuery)
            );
            setFilteredSong(filterS);
            if (filterS.length === 0) setSearchResults(`No records`);
            else if (filterS.length === 1) setSearchResults(`Found 1 record`);
            else if (filterS.length > 1)
                setSearchResults(`Showing ${filterS.length} records`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, searchQuery, loading]);

    const handleSearch = (query) => {
        console.log('handleSearch: ', query);
        setSearchQuery(query);
    };

    return (
        <div>
            <SearchBox
                searchBoxText={searchQuery}
                searchBoxChange={handleSearch}
            />
            {searchQuery ? (
                <div style={{ float: 'right', paddingBottom: '1%' }}>
                    {searchResults}
                </div>
            ) : null}
            <h2>Latest songs</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Container className='py-3'>
                    {filteredSong.map((song, index) => (
                        <Song
                            key={index}
                            song={song}
                            showDelete={false}
                            showAddSong={false}
                            isEditPlaylist={false}
                        />
                    ))}
                </Container>
            )}
        </div>
    );
};

export default SongScreen;
