'use strict';

var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Meal = mongoose.model('Meal');
var Rating = mongoose.model('Rating');

router.get('/ratings/:ratingNum', function(req, res, next) {
	mongoose.model('Rating').getMealsByRating(req.params.ratingNum)
})