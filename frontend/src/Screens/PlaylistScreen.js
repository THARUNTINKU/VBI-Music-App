import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getAllPlaylists, deletePlaylist } from '../actions/playlistActions';

const PlaylistScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const playlists = useSelector((state) => state.playlists);
    const { loading, error, allPlaylists } = playlists;

    const playlistDelete = useSelector((state) => state.playlistDelete);
    const { error: errorDelete, success: successDelete } = playlistDelete;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login?redirect=playlists');
        } else {
            dispatch(getAllPlaylists());
        }
    }, [dispatch, history, userInfo, successDelete]);

    const handleDeletePlaylist = (delplaylist) => {
        dispatch(deletePlaylist(delplaylist._id));
    };

    return (
        <Container>
            {errorDelete && <Message variant='danger'> {errorDelete} </Message>}
            {allPlaylists && <h2>Playlists</h2>}
            <div className='d-flex justify-content-end'>
                <Link to='/playlists/create'>
                    <Button className='my-3' variant='primary'>
                        <i className='fas fa-plus'></i> Create playlist
                    </Button>
                </Link>
            </div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : allPlaylists.length > 0 ? (
                allPlaylists
                    .map((playlist, index) => {
                        return (
                            <Container key={index} className='py-3'>
                                <Card mb={4} style={{ cursor: 'pointer' }}>
                                    <Row
                                        noGutters
                                        style={{ paddingBottom: '2%' }}>
                                        <Col md={12}>
                                            <Card.Body>
                                                <Link
                                                    to={`/playlists/${playlist._id}`}
                                                    style={{
                                                        float: 'left',
                                                        width: '98%',
                                                    }}>
                                                    <Card.Title as='h5'>
                                                        <span>Playlist : </span>
                                                        {playlist.playlistName}
                                                    </Card.Title>
                                                </Link>
                                                <Card.Subtitle
                                                    as='div'
                                                    style={{
                                                        float: 'left',
                                                        width: '98%',
                                                    }}
                                                    className='text-muted'>
                                                    <span>Created Date : </span>
                                                    {
                                                        new Date(
                                                            playlist.createdAt
                                                        )
                                                            .toISOString()
                                                            .split('T')[0]
                                                    }
                                                </Card.Subtitle>
                                                <div
                                                    style={{
                                                        float: 'right',
                                                        position: 'absolute',
                                                        right: '2%',
                                                    }}
                                                    onClick={() =>
                                                        handleDeletePlaylist(
                                                            playlist
                                                        )
                                                    }>
                                                    <i className='fas fa-trash'></i>
                                                </div>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            </Container>
                        );
                    })
                    .reverse()
            ) : (
                <strong>No Playlists available..</strong>
            )}
        </Container>
    );
};

export default PlaylistScreen;
