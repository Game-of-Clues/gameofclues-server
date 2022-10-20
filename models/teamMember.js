const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamMemberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);