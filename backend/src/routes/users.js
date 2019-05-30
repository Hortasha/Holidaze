const UserModel = require('../models/user.model');
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register', (req, res, next) => {

    UserModel.find({
        $or:[
            { username: req.body.username },
            { email: req.body.email }
        ]
    })
        
        .exec()
        .then(user => {
            if(user.length > 0) {
                return res.status(401).send({
                    message: 'Registration Failed'
                });
            } else {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err) {
                        return res.status(500).send('Something went wrong');
                    } else {
                        let user = new UserModel({
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                            phone: req.body.phone,
                            card: req.body.card,
                            type: req.body.type
                        });
            
                        user.save(function(err, post) {
                            if(err) { return next(err) }
                    
                            return res.status(201).send({
                                message: 'Registered'
                            });
                        });
                    }
                });
            }
        })

});

router.post('/login', (req, res, next) => {
    UserModel.find({ username: req.body.username }, function (err, user) {
        if (user.length < 1) {
             return res.status(401).json({
                message: 'Auth Failed'
            });
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
                    token: token,
                    type: user[0].type,
                    username: user[0].username
                });
            }
            return res.status(401).json({
                message: 'Auth Failed'
            });
        })
    });
});

module.exports = router;