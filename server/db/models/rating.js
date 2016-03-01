'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingSchema = new Schema({
	meal: { type: Schema.Types.ObjectId, ref: 'Meal' },
	rating: {type: Number, required: true, default: 0},
  	ratingText: {type: String, required: true},
  	author: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Rating', ratingSchema);

// need to require in index.js???

