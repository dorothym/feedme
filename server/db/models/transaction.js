'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionStates = ['stillShopping', 'checkingOut', 'placedOrder', 'cookingOrder','orderDelivered'];

var transactionSchema = new Schema({
	customerId:  {type: Schema.Types.ObjectId, ref: 'User'}, 
	totalprice: {type: Number},
	mealId:  [{type: Schema.Types.ObjectId, ref: 'Meal'}],
 	pickupTime: {type: Date}, // need help - different options for formatting?
 	isDeliveryOrder: {type: Boolean, default: true},
	status: {type: String, enum: transactionStates }
});

//transactionSchema.methods.removeMeal = function (idOfMeal){
//  var i = this.mealId.indexOf(idOfMeal);
//  var updatedMealArr = this.mealId.splice(i, 1);
//  return updatedMealArr;
//}

module.exports = mongoose.model('Transaction', transactionSchema);

