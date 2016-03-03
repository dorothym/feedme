'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var dietArray = ['Vegetarian','Vegan','Paleo','Gluten-free','Kosher','Halal', 'None', 'Dairy-free'];
var cuisineArray = ['Italian','Indian','French', 'Mediterrenean', 'Brazilian', 'Thai','New American','Chinese','Japanese','Vietnamese','Mexican','Peruvian','Food truck','Sandwiches','Pub food', 'Spanish'];

var mealSchema = new Schema({
  name:  { type: String, required: true},
  cuisine: { type: String, required: true, enum: cuisineArray },
  description: { type: String, required: true},
  photo: { type: String},
  price: {type: Number, required: true},
  diet: { type: Array, enum: dietArray },
  tags: { type: [String] },
  servings: { type: Number }
});

mealSchema.methods.getChef = function () {
  var self = this;
  return mongoose.model('Chef').findOne({meals: {$elemMatch: {$eq : self._id} } }).exec();
}

mealSchema.methods.getAllRatings = function () {
  var self = this;
  return mongoose.model('Ratings').find({meal: self._id}).exec();
}

mealSchema.methods.addRating = function (ratingData) {
  ratingData.meal = this._id;
  //user id??
  return mongoose.model('Rating').create(ratingData).exec()
}


module.exports = mongoose.model('Meal', mealSchema);

