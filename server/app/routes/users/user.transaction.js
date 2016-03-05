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


router.param('cart', function(req, res, next, cart){
  req.params.currentUser.getCart()
  .then(function(cart){
    req.cart = cart;
    next();
  })
});

router.route('/:cart')
//get cart as the specific transaction of interest
  .get(function(req, res, next){
  res.json(req.cart);
  })
//update to cart
  .post(function(req, res, next){
    req.cart.set(req.body);
    req.cart.save()
    .then(function(updatedCart){
      res.json(updatedCart);
    })
    .then(null, next)
  })
//delete cart
  .delete(function(req, res, next){
    return req.cart.remove()
    .then(function(response){
      res.json(response);
    })
    .then(null, next)
  })