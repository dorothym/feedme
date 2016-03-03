
 'use strict';

var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Meal = mongoose.model('Meal');
var Transaction = mongoose.model('Transaction');

//all transactions for user
router.get('/', function(req, res, next){
  Transaction.find({customer: req.params.id})
  .populate('meals')
  .populate('customer')
  .then(res.json)
  .then(null, next)
});