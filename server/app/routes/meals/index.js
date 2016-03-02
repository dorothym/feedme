'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Meal = mongoose.model('Meal');

router.get('/', function(req, res, next){
  Meal.find({})
  .then(function(allMeals){
    res.json(allMeals);
  })
  .then(null, next);
});

router.post('/', function(req, res, next){
  Meal.create(req.body)
  .then(function(createdMeal){
    res.json(createdMeal);
  })
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
    res.json(req.meal);
  })
//update one meal
  .put(function(req, res, next){
    Meal.findByIdAndUpdate(req.meal._id, {$set: req.body}, {new: true, runValidators: true})
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

//get all ratings for a meal
router.use('/:id/ratings', require('../ratings'));
