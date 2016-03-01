'use strict';

var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
  user:  {type: Schema.Types.ObjectId, ref: 'User'},
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}],
  totalprice: {type: Number, required: true},
});

// Transaction:
// Buyer user ID
// Meal package IDs [Array - reference?] // required
// Total price


module.exports = mongoose.model('Transaction', schema);