const UserModel = require('../models/user.model');
const express = require('express');
const router = express.Router();


router.get('/api/users', (req, res) => {
    UserModel.find({}, function (err, users) {
       res.send(users); 
    });
});

router.post('/api/users', (req, res, next) => {
    let user = new UserModel({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        card: req.body.card,
        type: req.body.type
    });

    user.save(function(err, post) {
        if(err) { return next(err) }

        res.send(201, post);
    });
});

router.post('/api/login', (req, res, next) => {
    UserModel.findOne({ "username": req.body.username, "password": req.body.password }, function (err, users) {
        res.send(users); 
    });
});

/*
router.get('/api/users/:id', (req, res) => {
    res.send(`No user with the id of ${req.params.id}`);
});
*/
//req.params ":"
//req.query "?"

//app.post();
//app.put();
//app.delete();

//400 Bad request

//Validation package: Joi

module.exports = router;