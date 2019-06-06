const HotelModel = require('../models/hotel.model');
const RoomModel = require('../models/room.model')
const UserModel = require('../models/user.model');
const express = require('express');
const router = express.Router();
const checkAuth = require('./../middleware/check-auth');

//Get all hotels
router.get('/hotels', (req, res, next) => {
    HotelModel.find({}, function(err, hotels) {
        return res.status(200).send(hotels);
    });
});

//Get hotels owned by you
router.get('/hotels/self', checkAuth, (req, res, next) => {
    UserModel.findById(req.userData.userId, function(err, user) {
        if(user.type === "Hotel") {
            HotelModel.find({ userId: req.userData.userId }, function(err, hotels) {
                return res.status(200).send(hotels);
            });
        } else {
            return res.status(400).send({
                message: 'Make sure you are logged in on a hotel account'
            });
        }
    });
});

//Get hotel by id
router.get('/hotels/:id', (req, res, next) => {
  HotelModel.find({ _id: req.params.id }, function(err, hotel) {
      return res.status(200).send(hotel);
  });
});

//Create new hotel
router.post('/hotels', checkAuth, (req, res, next) => {
    UserModel.findById(req.userData.userId, function(err, user) {
        if(user.type === "Hotel") {
            let hotel = new HotelModel({
                userId: req.userData.userId,
                name: req.body.name,
                location: req.body.location,
                image: req.body.image,
                rooms: []
            });
        
            hotel.save(function(err, post) {
                if(err) { return next(err) }
        
                return res.status(201).send({
                    message: 'hotel created'
                });
            })
        } else {
            return res.status(400).send({
                message: 'Make sure you are logged in on a hotel account'
            });
        }
    });
});

//Get room search
router.get('/rooms', (req, res, next) => {
  let query = {};  
  if(req.query.people) {
      query.max_occupancy = {$gt: req.query.people - 1};
  }

  if(req.query.location) {
      let reg = new RegExp(req.query.location, 'i');
      query.location = { $regex: reg }
  }

  if(req.query.from && req.query.to) {
      query.reserved = {
          $not: {
              $elemMatch: {from: {$lte: new Date(req.query.from)}, to: {$gte: new Date(req.query.to)}}
          }
      }
  }

    RoomModel.find(query, function(err, rooms){
        if(err){
            res.send(err);
        } else {
            for(let i = 0; i < rooms.length; i++) {
                rooms[i].reserved = [];
            }
            res.json(rooms);
        }
    });
});

//Get room by id
router.get('/rooms/:id', (req, res, next) => {
    RoomModel.find({ _id: req.params.id }, function(err, room) {
        room[0].reserved = [];
        return res.status(200).send(room);
    })
});

//Create new room
router.post('/rooms', checkAuth, (req, res, next) => {
    HotelModel.find({ _id: req.body.hotelId }, function(err, hotel) {
        if(hotel.length > 0) {
            let room = new RoomModel({
            hotelId: req.body.hotelId,
            type: req.body.type,
            beds: req.body.beds,
            max_occupancy: req.body.max_occupancy,
            price: req.body.price,
            image: req.body.image,
            reserved: [],
            location: hotel[0].location
            });

            room.save(function(err, post) {
            if(err) { return next(err) }
                return res.status(201).send({
                    message: 'room created'
                });
            });
        }
    });
});

//Get room by hotel Id
router.get('/hotel/rooms/:id', (req, res, next) => {
    RoomModel.find({ hotelId: req.params.id }, function(err, rooms) {
        for(let i = 0; i < rooms.length; i++) {
            rooms[i].reserved = [];
        }
        return res.status(200).send(rooms);
    })
});

//Reserve Room
router.post('/rooms/reserve', checkAuth, (req, res, next) => {
    RoomModel.find({
        _id: req.body.roomId,
        reserved: {
            $not: {
                $elemMatch: {from: {$lte: new Date(req.body.from)}, to: {$gte: new Date(req.body.to)}}
            }
        }
    }, function(err, room) {
        if(room.length === 0) {
            return res.status(404).json({
                message: 'Room does not exist or not available room'
            });
        } else {
            RoomModel.findOneAndUpdate(
                {
                    _id: req.body.roomId
                }, {
                    $push: {
                        reserved: {
                            from: req.body.from,
                            to: req.body.to,
                            userId: req.userData.userId
                        }
                    }
            }, {
                safe: true, new: true
            }, function (err, result) {
                if(err) { return next(err) }
                return res.status(200).send(result);
            })
        }
    });
});

//Get Reservations
router.get('/reservations', checkAuth, (req, res, next) => {
    UserModel.find({ _id: req.userData.userId }, function(err, user) {
        if(user[0].type === "User") {
            RoomModel.find({}, { reserved: { $elemMatch:{ userId: req.userData.userId } } }, function(err, reservations) {
                if(err) { return next(err) }
                return res.status(200).send(reservations);
            });
        } else {
            HotelModel.find({ userId: req.userData.userId }, function(err, hotels) {
                
                let query = [
                ]

                for(let i = 0; i < hotels.length; i++) {
                    query.push(hotels[i]._id);
                }
                
                RoomModel.find({hotelId: { $in: query } }, function(err, rooms) {
                    if(err) { return next(err) }
                    return res.status(200).send(rooms);
                })
            });
        }
    });
});

module.exports = router;