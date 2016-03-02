'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Buyer = mongoose.model('Buyer');

router.get('/', function(req, res, next){
  Buyer.find({})
  .then(function(allBuyers){
    res.json(allBuyers);
  })
  .then(null, next);
});

router.post('/', function(req, res, next){
  Buyer.create(req.body)
  .then(function(createdBuyer){
    res.json(createdBuyer);
  })
  .then(null, next);
});

router.param('id', function(req, res, next, id){
  Buyer.findById(id)
  .then(function(buyer){
    req.buyer = buyer;
    next();
  })
});

router.route('/:id')
//get one buyer
  .get(function(req, res, next){
    res.json(req.buyer);
  })
//update one buyer
  .put(function(req, res, next){
    Buyer.findByIdAndUpdate(req.buyer._id, {$set: req.body}, {new: true, runValidators: true})
    .then(function(updatedBuyer){
      res.json(updatedBuyer)
    })
    .then(null, next)
  })
//delete one buyer
  .delete(function(req, res, next){
    req.buyer.remove()
    .then(function(response){
      res.send(response);
    })
    .then(null, next)
  });
