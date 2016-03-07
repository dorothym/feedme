'use strict';

var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Transaction = mongoose.model('Transaction');

//all transactions for user
router.get('/', function(req, res, next){

  Transaction.find({customer: req.currentUser})
  .populate('meals')
  .then(function(transaction){
    res.json(transaction);
  })
  .then(null, next)
});
//create a new transaction (becomes cart?)
router.post('/', function(req, res, next){
  Transaction.create(req.body)
  .then(function(createdTransaction){
    res.json(createdTransaction);
  })
  .then(null, next);
});


router.param('cart', function(req, res, next, cart){
  req.currentUser.getCart()
  .then(function(cart){
    req.cart = cart;
    next();
  })
});

router.route('/:cart')
//get cart as the specific transaction of interest
  .get(function(req, res, next){
//    req.currentUser.getCart()
//    .then(function(cart){
//      res.json(cart)
//    })
    res.json(req.cart)
  })
//update to cart
  .put(function(req, res, next){
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
  Transaction.findOne({customer: req.currentUser._id})
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