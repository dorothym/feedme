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

//want to update chef rating (avg of all of the meal ratings) at save
ratingSchema.pre('save', function(next){
  var self = this;
  mongoose.model('Rating')
  .populate(self, 'meal')
  .then(function(rating){
    return self.meal.getChef()
  })
  .then(function(chef){
    return Promise.map(chef.meals, function(meal){
      return meal.getAllRatings();
    })
  })
});

module.exports = mongoose.model('Rating', ratingSchema);