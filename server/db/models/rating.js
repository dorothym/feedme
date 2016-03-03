'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');

var ratingSchema = new Schema({
	meal: { type: Schema.Types.ObjectId, ref: 'Meal' },
	rating: {type: Number, required: true, default: 0},
  	ratingText: {type: String, required: true},
  	author: { type: Schema.Types.ObjectId, ref: 'User' }
});

ratingSchema.methods.addRating = function (ratingData){
  Rating.create(ratingData)
}


// need to require in index.js???
//want to update chef rating (avg of all of the meal ratings) at save
ratingSchema.pre('save', function(next){
  
});

module.exports = mongoose.model('Rating', ratingSchema);