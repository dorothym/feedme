'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');

var chefSchema = userSchema.extend({
  specialty: String,
  bio: String,
  rating: {
    type: Number,
    default: 0
  },
  meals: {
    type: Schema.Types.ObjectId, 
    ref: 'Meals'
  }
});

mongoose.model('Chef', chefSchema);