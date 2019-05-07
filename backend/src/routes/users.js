const UserModel = require('../models/user.model');
const express = require('express');
const router = express.Router();


router.get('/api/users', (req, res) => {
    UserModel.find({}, function (err, users) {
       res.send(users); 
    });
});

router.post('/api/users', (req, res, next) => {
    console.log(req.body);
    let user = new UserModel({
        mail: req.body.mail,
        password: req.body.password,
        type: req.body.type,
        verified: false
    });

    user.save(function(err, post) {
        if(err) { return next(err) }

        res.send(201, post);
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