'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var dietArray = ['Vegetarian','Vegan','Paleo','Gluten-free','Kosher','Halal', 'None', 'Dairy-free'];
var cuisineArray = ['Italian','Indian','French', 'Mediterrenean', 'Brazilian', 'Thai','New American','Chinese','Japanese','Vietnamese','Mexican','Peruvian','Food truck','Sandwiches','Pub food', 'Spanish'];

var mealSchema = new Schema({
  name:  { type: String, required: true},
  cuisine: { type: String, required: true, enum: cuisineArray },
  description: { type: String, required: true},
  photo: { type: String},
  price: {type: Number, required: true},
  diet: { type: Array, enum: dietArray },
  servings: { type: Number },
  quantity: {type: Number}
});

mealSchema.methods.getChef = function () {
  return mongoose.model('Chef')
        .findOne({meals: {$elemMatch: {$eq : this._id} } }).exec();
}

mealSchema.methods.getAllRatings = function () {
  return mongoose.model('Rating')
        .find({meal: this._id}).exec();
}

mealSchema.methods.addRating = function (ratingData) {
  ratingData.meal = this._id;
  //user id??
  return mongoose.model('Rating')
        .create(ratingData)
}

mealSchema.methods.addMealToChef = function(chef) {
  var self = this;
  chef.meals.push(self._id)
    return chef.save()
    .then(function() {
   return self;
  })
}

module.exports = mongoose.model('Meal', mealSchema);

