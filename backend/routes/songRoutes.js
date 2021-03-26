const express = require('express');
const router = express.Router();
const {
    getSongs,
    getSongById,
    filterNonPlaylistSongs,
} = require('../controllers/songController');

router.route('/').get(getSongs);
router.route('/:id').get(getSongById);
// router.route('/:id/edit').get(protect, filterNonPlaylistSongs);

module.exports = router;
