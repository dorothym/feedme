'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Chef = mongoose.model('Chef');

router.use('/:id/meal', require('./chef.meals'));

router.get('/', function(req, res, next){
  Chef.find({})
  .then(function(allChefs){
    res.json(allChefs);
  })
  .then(null, next);
});

router.post('/', function(req, res, next){
  console.log("inside post",req.body)
  Chef.create(req.body)
  .then(function(createdChef){
    res.json(createdChef);
  })
  .then(null, next);
});

router.param('id', function(req, res, next, id){
  Chef.findById(id)
  .populate('meals')
  .then(function(chef){
    req.chef = chef;
    next();
  })
});

router.route('/:id')
//get one chef
  .get(function(req, res, next){
    res.json(req.chef);
  })
//update one chef
  .put(function(req, res, next){
    req.chef.set(req.body);
    req.chef.save()
    .then(function(updatedChef){
      res.json(updatedChef)
    })
    .then(null, next)
  })
//delete one chef
  .delete(function(req, res, next){
    req.chef.remove()
    .then(function(response){
      res.send(response);
    })
    .then(null, next)
  });