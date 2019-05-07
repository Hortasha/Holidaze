const mongoose = require('../mongodb/connect');

const UserSchema = new mongoose.Schema({
    mail: String,
    password: String,
    type: String,
    verified: Boolean
});

module.exports = mongoose.model('User', UserSchema);