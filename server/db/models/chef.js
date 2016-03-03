'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var userSchema = mongoose.model('User').schema;

var chefSchema = userSchema.extend({
  specialty: String,
  bio: String,
  rating: {
    type: Number,
    default: 0
  },
  meals: [{
    type: Schema.Types.ObjectId,
    ref: 'Meal'
  }]
});

// sballan consider static to get chef by rating, or even by average meal rating.

mongoose.model('Chef', chefSchema);