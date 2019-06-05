const ContactModel = require('../models/contact.model');
const UserModel = require('../models/user.model');
const express = require('express');
const router = express.Router();
const checkAuth = require('./../middleware/check-auth');

//Create new hotel
router.post('/contact', (req, res, next) => {
    let contact = new ContactModel({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        message: req.body.message
    });

    contact.save(function(err, post) {
        if(err) { return next(err) }
        return res.status(201).send({
            message: 'Message recived'
        });
    });
});

router.get('/contact', checkAuth, (req, res, next) => {
    UserModel.find({ _id: req.userData.userId }, function(err, user) {
        if(user[0].type === 'Admin') {
            ContactModel.find({}, function(err, contacts) {
                return res.status(200).send(contacts);
            });
        }
    });
});

module.exports = router;