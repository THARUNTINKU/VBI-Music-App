const asyncHandler = require('express-async-handler');
const { Playlist, validatePlaylist } = require('../models/playlist.model');
const { Song } = require('../models/song.model');

// @desc    Get all playlists
// @route   GET /api/playlists
// @access  Public
const getPlaylist = asyncHandler(async (req, res) => {
    const playlists = await Playlist.find().select('-__v');
    res.json(playlists);
});

// @desc    Fetch single playlists
// @route   GET /api/playlists/:id
// @access  Public
const getPlaylistById = asyncHandler(async (req, res) => {
    const playlist = await Playlist.findById(req.params.id);

    if (playlist) {
        res.json(playlist);
    } else {
        res.status(404);
        throw new Error('Playlist not found');
    }
});

// @desc    Create a playlist
// @route   POST /api/products
// @access  Private/Admin
const createPlaylist = asyncHandler(async (req, res) => {
    // validate
    const { error } = validatePlaylist(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { playlistName, playlistSongs, createdBy } = req.body;
    console.log('req.body: ', req.body);

    if (playlistSongs && playlistSongs.length === 0) {
        res.status(400);
        console.log('No songs added in playlists');
        throw new Error('No songs added in playlists');
    }

    const playlist = new Playlist({
        playlistName,
        playlistSongs,
        createdBy: req.user._id,
    });

    const createdPlaylist = await playlist.save();
    res.status(201).json(createdPlaylist);
});

// @desc    Update a playlist
// @route   PUT /api/products/:id
// @access  Private/Admin
const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistName, playlistSongs: arrPlaylistSongs } = req.body;

    const playlist = await Playlist.findById({ _id: req.params.id });

    playlist.playlistName = playlistName;
    playlist.playlistSongs = arrPlaylistSongs;

    await playlist.save();
    res.status(200).send('Succesfully updated');
});

// @desc    Update a playlist with existing
// @route   PUT /api/products/:id
// @access  Private/Admin
const updatePlaylistWithExisting = asyncHandler(async (req, res) => {
    const { playlistName, playlistSongs: arrPlaylistSongs } = req.body;

    const playlist = await Playlist.findById({ _id: req.params.id });

    playlist.playlistName = playlistName;

    if (arrPlaylistSongs && arrPlaylistSongs.length === 0) {
        arrPlaylistSongs.map((item) => {
            playlist.playlistSongs.push(item);
        });
    }

    await playlist.save();
    res.status(200).send('Succesfully updated');
});

// @desc    Delete a playlist
// @route   DELETE /api/playlists/:id
// @access  Private/Admin
const deletePlaylist = asyncHandler(async (req, res) => {
    const playlist = await Playlist.findById(req.params.id);

    if (playlist) {
        await playlist.remove();
        res.json({ message: 'Playlist removed' });
    } else {
        res.status(404);
        throw new Error('playlist not found');
    }
});

module.exports = {
    getPlaylist,
    getPlaylistById,
    createPlaylist,
    updatePlaylist,
    updatePlaylistWithExisting,
    deletePlaylist,
};
