'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dietArray = ['Vegetarian','Vegan','Paleo','Gluten-free','Kosher','Halal']
var cuisineArray = ['Italian','Indian','Thai','New American','Chinese','Japanese','Vietnamese','Mexican','Peruvian','Food truck','Sandwiches','Pub food']

var mealSchema = new Schema({
  name:  { type: String, required: true},
  cuisine: { type: String, required: true},
  description: { type: String, required: true},
  photo: { data: Buffer },
  price: {type: Number, required: true},
  diet: { type: Array, enum: dietArray },
  tags: { type: Array },
  servings: { type: Number }
});


module.exports = mongoose.model('Meal', mealSchema);