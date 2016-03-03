'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var userSchema = mongoose.model('User').schema;

var chefSchema = userSchema.extend({
  specialty: String,
  bio: String,
  rating: {
    type: Number,
    default: 0
  },
  meals: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Meal'
  }]
});

chefSchema.methods.addNewMeal = function (mealData){
  var self = this;
  return Mongoose.model('Meal').create(mealData)
          .then(function(meal){
            self.meals.addToSet(meal._id);
            return self.save();
          });
}

chefSchema.methods.removeMeal = function(mealData){
  //does .pull in mongoose work like array methods 'pull' or finds specific item and removes it?
  var self = this;
  return mongoose.model('Meal').findByIdAndRemove(mealData._id)
  .then(function(){
    self.meals.pull(mealData)
    return self.save()
  });
}

mongoose.model('Chef', chefSchema);