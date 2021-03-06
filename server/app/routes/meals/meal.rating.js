'use strict';

var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Meal = mongoose.model('Meal');
var Rating = mongoose.model('Rating');
var Promise = require('bluebird')

//get all ratings for a meal
router.get('/', function(req, res, next){
  req.meal.getAllRatings()
  .then(function(allRatings){
    res.json(allRatings)
  })
  .then(null, next)
});
//create a new rating for a meal
router.post('/', function(req, res, next){
   req.meal.addRating(req.body)
  .then(function(newRating){
    res.json(newRating);
  })
  .then(null, next)
});

router.param('ratingId', function(req, res, next, ratingId){
  Rating.findById(ratingId)
  .then(function(rating){
    req.rating = rating;
    next();
  })
  .then(null, next)
});

router.route('/:ratingId')
//get specific rating for meal
  .get(function(req, res, next){
    res.json(req.rating);
  })
//update specific rating for meal
  .put(function(req, res, next){
    req.rating.set(req.body);
    req.rating.save()
    .then(function(updatedRating){
      res.json(updatedRating);
    })
    .then(null, next)
  })
//delete specific rating for meal
  .delete(function(req, res, next){
    req.rating.remove()
    .then(function(response){
      res.json(response);
    })
    .then(null, next)
  });