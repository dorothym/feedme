// 'use strict';

// var router = require('express').Router({mergeParams: true});
// module.exports = router;
// var mongoose = require('mongoose');
// var Meal = mongoose.model('Meal');


// // http://localhost:1337/api/meals/cuisine/italian
// router.get('/cuisine/:cuisineType', function(req, res, next) {
// 	console.log(" got into /cuisine/:cuisineType")
// 	var cuisine = req.params.cuisineType;
	
// 	mongoose.model('Meal').browseByCuisine(cuisine)
// 	.then(function(meals) {
// 		console.log(meals)
// 		res.send(meals)
// 	})
// 	.then(null, next);
// })

