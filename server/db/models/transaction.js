'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
	// do we need to add sessionId?
	customerId:  {type: Schema.Types.ObjectId, ref: 'User'}, 
	// this is not required initially. could be anonymous user just browsing. 
	// will need to check customer ID is present before allowing user to check out
	mealPackageIds: [{type: Schema.Types.ObjectId, ref: 'MealPackage'}],
	totalprice: {type: Number},
	status: {type: String} // options: pending (if customer is still shopping) OR checkout (if during checkout) OR complete (if order has been placed)
});

module.exports = mongoose.model('Transaction', transactionSchema);

