'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var dietArray = ['Vegetarian','Vegan','Paleo','Gluten-free','Kosher','Halal']
var cuisineArray = ['Italian','Indian','Thai','New American','Chinese','Japanese','Vietnamese','Mexican','Peruvian','Food truck','Sandwiches','Pub food']

var mealSchema = new Schema({
  name:  { type: String, required: true},
  // sballan Consider default cuisine
  cuisine: { type: String, required: true, enum: cuisineArray },
  description: { type: String, required: true},
  photo: { data: Buffer },
  price: {type: Number, required: true},
  diet: { type: Array, enum: dietArray },
  // sballan will tags be searchable? Consider schema for tags
  tags: { type: Array },
  servings: { type: Number }
});

// sballan consider static for getting all meals that a user has ordered or rated.

mealSchema.methods.getChef = function () {
  var meal = this;
  return mongoose.model('Chef').findOne({meals: {$elemMatch: {$eq : meal._id} } });

}

module.exports = mongoose.model('Meal', mealSchema);