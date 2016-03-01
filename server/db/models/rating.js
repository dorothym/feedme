'use strict';

var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema({
	rating: {type: Number, required: true},
  	ratingText: {type: String, required: true}
});

module.exports = mongoose.model('Rating', schema);

// need to require in index.js???