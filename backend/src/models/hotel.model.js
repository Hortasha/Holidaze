const mongoose = require('../mongodb/connect');

const HotelSchema = new mongoose.Schema({
    userId: String,
    name: String,
    location: String,
    image: String,
    rooms: [{
        roomId: String
    }]
});

module.exports = mongoose.model('Hotel', HotelSchema);