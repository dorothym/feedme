'use strict';

var mongoose = require('mongoose');

var mealSchema = new mongoose.Schema({
  name:  { type: String, required: true},
  cuisine: { type: String, required: true},
  description: { type: String, required: true},
  photo: { data: Buffer },
  price: {type: Number, required: true},
  diet: { type: Array },
  tags: { type: Array },
  servings: { type: Number },
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }]
});


module.exports = mongoose.model('Meal', schema);

// need to require in index.js???