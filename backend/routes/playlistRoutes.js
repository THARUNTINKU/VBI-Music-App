const express = require('express');
const router = express.Router();
const {
    getPlaylist,
    getPlaylistById,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    updatePlaylistWithExisting,
} = require('../controllers/playlistController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPlaylist).post(protect, createPlaylist);
router
    .route('/:id')
    .get(protect, getPlaylistById)
    .put(protect, updatePlaylist)
    .delete(protect, admin, deletePlaylist);
router.route('/:id/edit').put(protect, updatePlaylistWithExisting);

module.exports = router;
