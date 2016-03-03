'use strict';

var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Chef = mongoose.model('Chef');
var Meal = mongoose.model('Meal');

// sballan If wired up correctly, you won't need to lookup the chef again.
// sballan You can use req.chef
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

router.route('/:mealId')
  .get(function(req, res, next){
    res.json(req.meal);
  })
//have chef update a meal
// sballan Use req.meal!
  .put(function(req, res, next){

/*  sballan Validators and Hooks will be fired when you do it this way.
  req.meal.set(req.body)
  req.meal.save()
  .then(function(meal) {
    res.json(meal)
  })
*/
    Meal.findByIdAndUpdate(req.meal._id, {$set: req.body}, {new: true, runValidators: true})
    .then(function(updatedMeal){
      res.json(updatedMeal);
    })
    .then(null, next)
})
//have chef remove a meal
  .delete(function(req, res, next){
    Meal.removeMeal(req.meal)
    .then(function(updatedChef){
      res.json(updatedChef);
    })
    .then(null, next)
  });
