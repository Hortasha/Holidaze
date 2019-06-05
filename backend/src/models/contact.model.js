const mongoose = require('../mongodb/connect');

const ContactSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    message: String
});

module.exports = mongoose.model('Contact', ContactSchema);