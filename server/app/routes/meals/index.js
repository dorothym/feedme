'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Meal = mongoose.model('Meal');
var Promise = require('bluebird');

router.use('/:id/rating', require('./meal.rating'));
// router.use('/browse', require('./meals.browse.js'));


// Passed query
router.get('/', function(req, res, next){
  Meal.find(req.query)
  .then(function(allMeals){
    res.json(allMeals);
  })
  .then(null, next);
});

router.post('/', function(req, res, next){
  Meal.create(req.body)
  .then(res.json)
  .then(null, next);
});

router.param('id', function(req, res, next, id){
  Meal.findById(id)
  .then(function(meal){
    req.meal = meal;
    next();
  })
});

router.route('/:id')
//get one meal
  .get(function(req, res, next){
    Promise.all([req.meal.getChef(), req.meal.getAllRatings()])
//    req.meal.getChef()
    .then(function(arr){
      var resObj = {meal: req.meal, chef: arr[0], ratings: arr[1]}
      res.json(resObj);
    })
    .then(null, next)
  })
//update one meal
  .put(function(req, res, next){
    req.meal.set(req.body);
    req.save()
    .then(function(updatedMeal){
      res.json(updatedMeal)
    })
    .then(null, next)
  })
//delete one meal
  .delete(function(req, res, next){
    req.meal.remove()
    .then(function(response){
      res.send(response);
    })
    .then(null, next)
  });