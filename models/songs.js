//Database Connection
const mongoose = require('mongoose');

// Create Schema
const Schema = mongoose.Schema
const SongsSchema = new Schema({
    songTitle: {
        type: String,
        required: true,
    },
    band: {
        type: String,
        required: true,
    },
    // songFile: {
    //     type: String,
    //     required: true,
    // },
    cover: {
        type: String,
        required: true,
    },

})


module.exports = mongoose.model('Songs', SongsSchema)