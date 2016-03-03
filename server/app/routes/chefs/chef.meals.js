'use strict';

var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Chef = mongoose.model('Chef');
var Meal = mongoose.model('Meal');

//get all meals for chef
router.get('/', function(req, res, next){
  Chef.findById(req.params.id)
  .populate('meals')
  .then(function(chef){
    res.json(chef.meals);
  })
  .then(null, next)
});

//have chef add a new meal
router.post('/', function(req, res, next){
  Chef.findById(req.params.id)
  .then(function(chef){
    return chef.addNewMeal(req.body)
  })
  .then(function(chefWithNewMeal){
    res.json(chefWithNewMeal)
  })
  .then(null, next)
});

router.param('mealId', function(req, res, next, mealId){
  Meal.findById(mealId)
  .then(function(meal){
    req.meal = meal;
    next();
  })
  .then(null, next)
});

//have chef update a meal
//router.put('/:mealId', function(req, res, next){
//  
//});