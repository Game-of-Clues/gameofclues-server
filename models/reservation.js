const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
  duration: {
    type: Number,
    required: true
  },
  people: {
    type: Number,
    required: true
  },
  gameType: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Reservation', reservationSchema);