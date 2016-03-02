'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res, next){
  User.find(req.body)
  .then(function(allUsers){
    res.json(allUsers);
  })
  .then(null, next);
});

router.post('/', function(req, res, next){
  User.create(req.body)
  .then(function(createdUser){
    res.json(createdUser);
  })
  .then(null, next);
});

router.param('id', function(req, res, next, id){
  User.findById(id)
  .thUseren(function(user){
    req.user = user;
    next();
  })
});

router.route('/:id')
//get one user
  .get(function(req, res, next){
    res.json(req.user);
  })
//update one user
  .put(function(req, res, next){
    User.findByIdAndUpdate(req.user._id, {$set: req.body}, {new: true, runValidators: true})
    .then(function(updatedUser){
      res.json(updatedUser)
    })
    .then(null, next)
  })
//delete one user
  .delete(function(req, res, next){
    req.user.remove()
    .then(function(response){
      res.send(response);
    })
    .then(null, next)
  });
