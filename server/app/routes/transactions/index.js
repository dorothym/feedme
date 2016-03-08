'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Transaction = mongoose.model('Transaction');

router.get('/', function(req, res, next){
  Transaction.find({})
  .then(function(allTransactions){
    res.json(allTransactions);
  })
  .then(null, next);
});

// get transaction by meal ID
router.get('/meals/:mealid', function(req, res, next){
  console.log("new get by mealid")
  mongoose.model('Meal').findById(req.params.mealid)
  .then(function(theMeal) {
    console.log("theMeal",theMeal)
      return Transaction.getByMeal(theMeal)
  }, function(err) {console.error("Err1",err)})
  .then(function(transactionsByMeal){
    console.log("transaction by meai", transactionsByMeal)
    res.json(transactionsByMeal);
  }, function(err) {console.error("Err2",err)})
  .then(null, next);
});

router.post('/', function(req, res, next){
  Transaction.create(req.body)
  .then(function(createdTransaction){
    res.json(createdTransaction);
  })
  .then(null, next);
});

router.param('id', function(req, res, next, id){
  Transaction.findById(id)
  .then(function(transaction){
    req.transaction = transaction;
    next();
  })
});

router.route('/:id')
//get one transaction
  .get(function(req, res, next){
    res.json(req.transaction);
  })
//update one transaction
  .put(function(req, res, next){
    req.transaction.set(req.body);
    req.transaction.save()
    .then(function(updatedTransaction){
      res.json(updatedTransaction)
    })
    .then(null, next)
  })
//delete one transaction
  .delete(function(req, res, next){
    req.transaction.remove()
    .then(function(response){
      res.send(response);
    })
    .then(null, next)
  });
