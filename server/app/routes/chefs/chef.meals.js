'use strict';

var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Chef = mongoose.model('Chef');
var Meal = mongoose.model('Meal');

router.get('/', function(req, res, next){
    res.json(req.chef.meals);

});

router.get('/', function(req, res, next) {
  Chef.find({_id: req.chef._id})
  .populate('meals')
  .then(function(chef) {
    res.json(chef.meals);
  })
  .then(null, next)
})

//have chef add a new meal
router.post('/', function(req, res, next){
  req.chef.addNewMeal(req.body)
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

router.route('/:mealId')
  .get(function(req, res, next){
    res.json(req.meal);
  })
//have chef update a meal
  .put(function(req, res, next){
    req.meal.set(req.body);
    req.meal.save()
    .then(function(updatedMeal){
      res.json(updatedMeal);
    })
    .then(null, next)
})
//have chef remove a meal
  .delete(function(req, res, next){
    req.meal.remove()
    .then(function(updatedChef){
      res.json(updatedChef);
    })
    .then(null, next)
  });
