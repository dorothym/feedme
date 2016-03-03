'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionStates = ['stillShopping', 'checkingOut', 'placedOrder', 'cookingOrder','orderDelivered'];

var transactionSchema = new Schema({
	customer:  {type: Schema.Types.ObjectId, ref: 'User'}, 
	totalPrice: {type: Number},
	meals:  [{type: Schema.Types.ObjectId, ref: 'Meal'}],
 	pickupTime: {type: Date}, // need help - different options for formatting?
 	isDeliveryOrder: {type: Boolean, default: true},
	status: {type: String, enum: transactionStates }
});

transactionSchema.methods.removeMeal = function (mealId){
  var i = this.meals.indexOf(mealId);
  this.meals = this.meals.splice(i, 1);
  return this.save();
}

transactionSchema.methods.addMeal = function (mealId){
  this.meals.addToSet(mealId);
  return this.save();
}

module.exports = mongoose.model('Transaction', transactionSchema);