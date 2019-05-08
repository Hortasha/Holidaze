const mongoose = require('../mongodb/connect');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    card: String,
    type: String
});

module.exports = mongoose.model('User', UserSchema);