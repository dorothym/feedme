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
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Meal'
  }]
});

mongoose.model('Chef', chefSchema);