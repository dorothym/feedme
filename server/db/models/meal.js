'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mealSchema = new Schema({
  name:  { type: String, required: true},
  cuisine: { type: String, required: true},
  description: { type: String, required: true},
  photo: { data: Buffer },
  price: {type: Number, required: true},
  diet: { type: Array },
  tags: { type: Array },
  servings: { type: Number }
});


module.exports = mongoose.model('Meal', mealSchema);

// need to require in index.js???