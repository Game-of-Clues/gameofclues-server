const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Game', gameSchema);