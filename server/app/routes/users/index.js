'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//route to transactions for logged in user
router.use('/:id/transaction', require('./user.transaction'));

router.get('/', function(req, res, next){
  User.find(req.body)
  .populate('meals')
  .then(function(allUsers){
    res.json(allUsers);
  })
  .then(null, next);
});

router.post('/', function(req, res, next){
  console.log("inside post to users", req.body)
  User.create(req.body)
  .then(function(createdUser){
    res.json(createdUser);
  })
  .then(null, next);
});

router.param('id', function(req, res, next, id){
  User.findById(id)
  .then(function(user){
    req.currentUser = user;
    next();
  })
});

router.route('/:id')
//get one user
  .get(function(req, res, next){
    res.json(req.currentUser);
  })
//update one user
  .put(function(req, res, next){
    console.log("Inside PUT", req.body)
    req.currentUser.set(req.body);
    req.currentUser.save()
    .then(function(updatedUser){
      res.json(updatedUser)
    })
    .then(null, next)
  })
//delete one user
  .delete(function(req, res, next){
    req.currentUser.remove()
    .then(function(response){
      res.send(response);
    })
    .then(null, next)
  });
