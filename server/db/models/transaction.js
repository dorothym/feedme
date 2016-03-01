'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
	// do we need to add sessionId?
	customerId:  {type: Schema.Types.ObjectId, ref: 'User'},
	mealPackageIds: [{type: Schema.Types.ObjectId, ref: 'MealPackage'}],
	totalprice: {type: Number},
});

module.exports = mongoose.model('Transaction', transactionSchema);

