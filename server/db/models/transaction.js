'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
	customerId:  {type: Schema.Types.ObjectId, ref: 'User'}, 
	totalprice: {type: Number},
	mealId:  [{type: Schema.Types.ObjectId, ref: 'Meal'}],
 	pickupTime: {type: Date}, // need help - different options for formatting?
 	isDeliveryOrder: {type: Boolean},
	status: {type: String } // options: stillShopping, purchased, readyForPickup, pickedUp
});

module.exports = mongoose.model('Transaction', transactionSchema);

