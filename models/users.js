//Database Connection
const mongoose = require('mongoose');

// Create Schema
const Schema = mongoose.Schema
const UsersSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    myPlaylist: {
        songs: [
            {
                songId:{
                    type: Schema.Types.ObjectId,
                    ref: 'Songs',
                    required: true
                }
            }
        ]
    }
})





module.exports = mongoose.model('Users', UsersSchema)