const mongoose = require('mongoose');
const Joi = require('joi');

const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            minlength: 5,
            maxlength: 255,
            required: true,
            trim: true,
        },
        album: {
            type: String,
            minlength: 5,
            maxlength: 255,
            required: true,
            trim: true,
        },
        singer: {
            type: String,
            minlength: 5,
            maxlength: 255,
            trim: true,
        },
        duration: {
            type: String,
            maxlength: 255,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Song = mongoose.model('Song', songSchema);

function validateSong(song) {
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        album: Joi.string().min(5).max(255),
        singer: Joi.string().min(5).max(255),
        duration: Joi.string().max(255),
        image: Joi.string().max(255),
    };
    return Joi.validate(song, schema);
}

module.exports = { Song, songSchema, validateSong };
