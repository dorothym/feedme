'use strict';

var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Transaction = mongoose.model('Transaction');

router.use('/:cart/:mealId', require('./user.cart.meal'));

//all transactions for user
router.get('/', function(req, res, next){
  Transaction.find({customer: req.params.currentUser})
  .then(res.json)
  .then(null, next)
});
//create a new transaction (becomes cart?)
router.post('/', function(req, res, next){
  Transactions.create(req.body)
  .then(function(createdTransaction){
    res.json(createdTransaction);
  })
  .then(null, next);
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
    req.cart.remove()
    .then(function(response){
      res.json(response);
    })
    .then(null, next)
  })

router.param('transactionId', function(req, res, next, transactionId){
  Transaction.findOne({customer: req.params.currentUser._id})
  .then(function(transaction){
    req.transaction = transaction;
    next();
  })
});

router.route('/:transactionId')
//general routes for any specific transaction
  .get(function(req, res, next){
    res.json(req.transaction);
  })

  .post(function(req, res, next){
    req.transaction.set(req.body);
    req.transaction.save()
    .then(function(updatedTransaction){
      res.json(updatedTransaction);
    })
    .then(null, next)
  })

  .delete(function(req, res, next){
    req.transaction.remove()
    .then(function(response){
      res.json(response);
    })
    .then(null, next)
  })