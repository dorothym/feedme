'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// sballan Pick one, 'status' or 'states'
var transactionStates = ['stillShopping', 'checkingOut', 'placedOrder', 'cookingOrder','orderDelivered'];

var transactionSchema = new Schema({
	customer:  {type: Schema.Types.ObjectId, ref: 'User'},
	totalPrice: {type: Number},
  // sballan Make meals an object with a few values, so you can keep track of associated data like quantity.
  /*
    meals: [
      {
        meal: {type: Schema.Types.ObjectId, ref: 'Meal'},
        orderPrice: Number,
        quantity: Number
      }
    ]
  */
	meals:  [{type: Schema.Types.ObjectId, ref: 'Meal'}],
 	pickupTime: {type: Date}, // need help - different options for formatting?
 	isDeliveryOrder: {type: Boolean, default: true},
	status: {type: String, enum: transactionStates }
});

// sballan Consider adding methods for get all transactions of a particular status, or date range, or even location range for shipping.

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

module.exports = mongoose.model('Transaction', transactionSchema);