'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Transaction = mongoose.model('Transaction');

//req.params.cart, req.params.currentUser req.params.mealId
//'users/:id/transaction''/:cart/:mealId'

//route for adding a meal to the cart
router.put('/', function(req, res, next){
  req.cart.addMeal(req.mealId)
  .then(function(updatedCart){
    res.json(updatedCart);
  })
  .then(null, next)
});
//route for removing a meal from cart
router.delete('/', function(req, res, next){
  console.log('id', req.cart)
  req.cart.removeMeal(req.param.mealId)
  .then(function(updatedCart){
    res.json(updatedCart);
  })
  .then(null, next)
});
