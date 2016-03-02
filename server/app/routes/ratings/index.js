'use strict';

var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Rating = mongoose.model('Rating');

//get all ratings for a meal (cont.)
router.get('/', function(req, res, next){
  Rating.find({meal: req.params.id})
  .then(function(allRatings){
    res.json(allRatings);
  })
  .then(null, next);
});

//!! MAKE AN addRating method on meals !!

//router.post('/', function(req, res, next){
//  Rating.create(req.body)
//  .then(function(createdRating){
//    res.json(createdRating);
//  })
//  .then(null, next);
//});

router.param('ratingId', function(req, res, next, ratingId){
  Rating.findById(ratingId)
  .then(function(rating){
    req.rating = rating;
    next();
  })
});

router.route('/:ratingId')
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
