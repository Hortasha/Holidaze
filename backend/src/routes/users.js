const UserModel = require('../models/user.model');
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/api/users', (req, res, next) => {

    let passwordHash;
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            res.status(500).send('Something went wrong');
        } else {
            passwordHash = hash;
            let user = new UserModel({
                username: req.body.username,
                password: passwordHash,
                email: req.body.email,
                phone: req.body.phone,
                card: req.body.card,
                type: req.body.type
            });

            user.save(function(err, post) {
                if(err) { return next(err) }
        
                res.send(201, post);
            });
        }
    });
});

router.post('/api/login', (req, res, next) => {
    UserModel.find({ username: req.body.username }, function (err, user) {
        if (user.length < 1) {
             return res.status(401).json({
                message: 'Auth Failed'
            });n
        }
        
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            }

            if (result) {

                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id
                },
                'secret',
                {
                    expiresIn: '1h'
                });

                return res.status(200).json({
                    message: 'Auth Successful',
                    token: token
                });
            }
            return res.status(401).json({
                message: 'Auth Failed'
            });
        })
    });
});

module.exports = router;