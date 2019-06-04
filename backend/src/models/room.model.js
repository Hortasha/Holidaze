const mongoose = require('../mongodb/connect');

const RoomSchema = new mongoose.Schema({
    hotelId: String,
    type: String,
    beds: Number,
    max_occupancy: Number,
    price: Number,
    image: String,
    location: String,
    reserved: [{
        from: Date,
        to: Date,
        userId: String
    }]
});

module.exports = mongoose.model('Room', RoomSchema);