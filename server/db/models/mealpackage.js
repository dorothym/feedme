'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mealPackageSchema = new Schema({
	mealId:  {type: Schema.Types.ObjectId, ref: 'Meal'},
	sellerId:  {type: Schema.Types.ObjectId, ref: 'User'},
	quantity: {type: Number, default: 1, required: true},
 	pickupTime: {type: Date}, // need help - different options for formatting?
 	isDeliveryOrder: {type: Boolean},
 	price: {type: Number},
	status: {type: String } // options: pending, in progress, complete

});

module.exports = mongoose.model('MealPackage', mealPackageSchema);
