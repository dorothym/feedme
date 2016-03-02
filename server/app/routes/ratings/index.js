'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Rating = mongoose.model('Rating');

router.get('/', function(req, res, next){
  Rating.find({})
  .then(function(allRating){
    res.json(allRating);
  })
  .then(null, next);
});

router.post('/', function(req, res, next){
  Rating.create(req.body)
  .then(function(createdRating){
    res.json(createdRating);
  })
  .then(null, next);
});

router.param('id', function(req, res, next, id){
  Rating.findById(id)
  .then(function(rating){
    req.rating = rating;
    next();
  })
});

router.route('/:id')
//get one rating
  .get(function(req, res, next){
    res.json(req.rating);
  })
//update one rating
  .put(function(req, res, next){
    Rating.findByIdAndUpdate(req.rating._id, {$set: req.body}, {new: true, runValidators: true})
    .then(function(updatedRating){
      res.json(updatedRating)
    })
    .then(null, next)
  })
//delete one rating
  .delete(function(req, res, next){
    req.rating.remove()
    .then(function(response){
      res.send(response);
    })
    .then(null, next)
  });
