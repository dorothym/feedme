'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingSchema = new Schema({
	meal: { type: Schema.Types.ObjectId, ref: 'Meal' },
	rating: {type: Number, required: true, default: 0},
  	ratingText: {type: String, required: true},
  	author: { type: Schema.Types.ObjectId, ref: 'User' }
});

//want to update chef rating (avg of all of the meal ratings) at save
//ratingSchema.pre('save', function(next){
////  var allRatings = [];
////  meal.getChef()
////  .populate('meals')
////  .then(function(chef){
////    return Promise.all(chef.meals.map(function(meal){
////      meal.getAllRatings();
////    }))
////  })
////  .then(function(arrOfPromises){
////    return Promise.all(arrOfPromises.map(function(promise){
////      
////    }))
////  })
//});

module.exports = mongoose.model('Rating', ratingSchema);