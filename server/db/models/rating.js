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

// sballan consider static for getting ratings between a certain range or of a certain value.

ratingSchema.methods.addRating = function (ratingData){
  Rating.create(ratingData)
}


// need to require in index.js???
//want to update chef rating (avg of all of the meal ratings) at save
ratingSchema.pre('save', function(next){
  var self = this;
  mongoose.model('Rating')
  .populate(self, 'meal')
  .then(function(rating){
    return self.meal.getChef()
  })
  .then(function(chef){
    Promise.map(chef.meals, function(meal){
      return meal.getAllRatings();
    })
  })
});

module.exports = mongoose.model('Rating', ratingSchema);