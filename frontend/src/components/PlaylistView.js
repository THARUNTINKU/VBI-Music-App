import React from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PlaylistView = ({ playlist, handleDelete }) => {
    return (
        <Container className='py-3'>
            <Card mb={4} style={{ cursor: 'pointer' }}>
                <Row noGutters style={{ paddingBottom: '2%' }}>
                    <Col md={12}>
                        <Card.Body>
                            <Link
                                to={`/playlists/${playlist._id}`}
                                style={{ float: 'left', width: '98%' }}>
                                <Card.Title as='h5'>
                                    <span>Playlist : </span>
                                    {playlist.playlistName}
                                </Card.Title>
                            </Link>
                            <Card.Subtitle
                                as='div'
                                style={{ float: 'left', width: '98%' }}
                                className='text-muted'>
                                <span>Created Date : </span>
                                {
                                    new Date(playlist.createdAt)
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
                                onClick={() => handleDelete}>
                                <i className='fas fa-trash'></i>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default PlaylistView;
