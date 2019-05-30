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

//Delete Hotel

//Get room search
router.get('/rooms', (req, res, next) => {
  let query = {};
  if(req.query.beds) {
      query.beds = req.query.beds;
  }
  
  if(req.query.people) {
      query.max_occupancy = {$gt: req.query.people};
  }

  if(req.query.minimumPrice || req.query.maximumPrice) {
      query.price = {}
      if(req.query.minimumPrice) {
          query.price.$gte = req.query.minimumPrice;
      }

      if(req.query.maximumPrice) {
          query.price.$lte = req.query.maximumPrice;
      }
  }

  if(req.query.from && req.query.to) {
      query.reserved = {
          $not: {
              $elemMatch: {from: {$lt: req.query.to}, to: {$gt: req.query.from}}
          }
      }
  }


  RoomModel.find(query, function(err, rooms){
      if(err){
          res.send(err);
      } else {
          res.json(rooms);
      }
  });
});

//Get room by id
router.get('/rooms/:id', (req, res, next) => {
  HotelModel.find({ _id: req.params.id }, function(err, room) {
      return res.status(200).send(room);
  });
});

//Create new room (NEXT with UI then TEST)
router.post('/rooms', checkAuth, (req, res, next) => {
    console.log(req.body);
    HotelModel.find({ _id: req.body.hotelId }, function(err, room) {
        if(room.length > 0) {
            let room = new RoomModel({
            hotelId: req.body.hotelId,
            type: req.body.type,
            beds: req.body.beds,
            max_occupancy: req.body.max_occupancy,
            price: req.body.price,
            image: req.body.image,
            reserved: []
            });

            room.save(function(err, post) {
            if(err) { return next(err) }

            return res.status(201).send({
                message: 'room created'
            });
            })
        }
    });
});


//Reserve Room

//Delete Room

module.exports = router;