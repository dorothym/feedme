'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var dietArray = ['Vegetarian','Vegan','Paleo','Gluten-free','Kosher','Halal']
var cuisineArray = ['Italian','Indian','Thai','New American','Chinese','Japanese','Vietnamese','Mexican','Peruvian','Food truck','Sandwiches','Pub food']

var mealSchema = new Schema({
  name:  { type: String, required: true},
  cuisine: { type: String, required: true, enum: cuisineArray },
  description: { type: String, required: true},
  photo: { type: String},
  price: {type: Number, required: true},
  diet: { type: Array, enum: dietArray },
  // sballan Consider making this type: [String]
  tags: { type: Array },
  servings: { type: Number }
});

// sballan consider static for getting all meals that a user has ordered or rated.

mealSchema.methods.getChef = function () {
  var self = this;
  return mongoose.model('Chef').findOne({meals: {$elemMatch: {$eq : self._id} } }).exec();
}

mealSchema.methods.getAllRatings = function () {
  var self = this;
  return mongoose.model('Ratings').find({meal: self._id}).exec();
}

module.exports = mongoose.model('Meal', mealSchema);