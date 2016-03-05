'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Transaction = mongoose.model('Transaction');

//req.params.cart, req.params.currentUser req.params.mealId
//'users/:id/transaction''/:cart/:mealId'

//route for adding a meal to the cart
router.put('/add', function(req, res, next){
  req.params.cart.addMeal(req.params.mealId)
  .then(function(updatedCart){
    res.json(updatedCart);
  })
  .then(null, next)
});
//route for removing a meal from cart
router.put('/add', function(req, res, next){
  req.params.cart.removeMeal(req.params.mealId)
  .then(function(updatedCart){
    res.json(updatedCart);
  })
  .then(null, next)
});
