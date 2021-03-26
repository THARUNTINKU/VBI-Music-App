import React from 'react';
import { Row, Col, Image, Button, ButtonGroup, Card } from 'react-bootstrap';

const Song = ({
    song,
    showDelete,
    showAddSong,
    handleAddPlaylists,
    removeSongFromPlaylist,
}) => {
    return (
        <Card className='mb-4'>
            <div style={{ backgroundColor: 'white' }}>
                <Row noGutters>
                    <Col md={2}>
                        <Image src={song.image} alt='music image' />
                    </Col>
                    <Col md={6} pt={3} pt-md={3} pt-sm={1}>
                        <Card.Body>
                            <Card.Title>
                                <span>Title : </span> {song.title}
                            </Card.Title>
                            <Card.Subtitle className='text-muted'>
                                <span>Album : </span>
                                {song.album}
                            </Card.Subtitle>
                            <Card.Text>Singers : {song.singer}</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col md={4} className='px-auto pt-md-5 pt-sm-1 mb-2'>
                        <Row noGutters>
                            <Col className='d-flex justify-content-center'>
                                <span>
                                    Play time :
                                    {song.duration ? song.duration : 'N/A'}
                                </span>
                            </Col>
                            <Col className='d-flex justify-content-center'>
                                {showDelete ? (
                                    <ButtonGroup aria-label='list type'>
                                        <Button
                                            variant='danger'
                                            onClick={removeSongFromPlaylist}>
                                            <i className='fas fa-minus-circle'></i>{' '}
                                            Remove
                                        </Button>
                                    </ButtonGroup>
                                ) : null}
                                {showAddSong ? (
                                    <ButtonGroup aria-label='list type'>
                                        <Button
                                            variant='dark'
                                            onClick={handleAddPlaylists}>
                                            <i className='fas fa-plus'></i> Add
                                            to list
                                        </Button>
                                    </ButtonGroup>
                                ) : null}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Card>
    );
};

export default Song;
