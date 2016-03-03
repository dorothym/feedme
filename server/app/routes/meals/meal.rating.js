'use strict';

var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Meal = mongoose.model('Meal');
var Rating = mongoose.model('Rating');

//get all ratings for a meal
router.get('/', function(req, res, next){
  Meal.findById(req.params.id)
  .then(function(meal){
    return meal.getAllRatings()
  })
  .then(function(allRatings){
    res.json(allRatings)
  })
  .then(null, next)
});