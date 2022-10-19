const mongoose = require('mongoose');
const { Schema } = mongoose;

const faqSchema = new Schema({
    questions: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Faq', faqSchema);