'use strict';

var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Transaction = mongoose.model('Transaction');

//all transactions for user
router.get('/', function(req, res, next){
  Transaction.find({customer: req.params.currentUser})
  .then(res.json)
  .then(null, next)
});

//get cart as the specific transaction of interest
router.get('/cart', function(req, res, next){
  req.params.currentUser.getCart()
  .then(function(cart){
    res.json(cart);
  })
});

