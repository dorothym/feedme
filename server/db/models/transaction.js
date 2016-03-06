'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionStatus = ['stillShopping', 'checkingOut', 'placedOrder', 'cookingOrder','orderDelivered'];

var transactionSchema = new Schema({
	customer:  {type: Schema.Types.ObjectId, ref: 'User', required: true}, 
	totalPrice: {type: Number},
	meals:  [{type: Schema.Types.ObjectId, ref: 'Meal'}],
 	pickupTime: {type: Date}, // need help - different options for formatting?
 	isDeliveryOrder: {type: Boolean, default: true},
	status: {type: String, enum: transactionStatus, required: true},
    date: { type: Date, default: Date.now }
});


transactionSchema.methods.removeMeal = function (mealId){
  var i = this.meals.indexOf(mealId);
  this.meals = this.meals.splice(i, 1);
  return this.save();
}

transactionSchema.methods.addMeal = function (mealId){
  //changed from addToSet to push because we want to add repeat elements here
  this.meals.push(mealId);
  return this.save();
}

transactionSchema.statics.getByStatus = function (statusType){
  return this.find({status: statusType});
}

transactionSchema.statics.getByDateRange = function (startDate, endDate){
  return this.find({date: {"$gte": new Date(startDate), "$lt": new Date(endDate)}})
}

module.exports = mongoose.model('Transaction', transactionSchema);