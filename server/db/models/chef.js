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
    type: Schema.Types.ObjectId, 
    ref: 'Meal'
  }]
});

chefSchema.methods.addNewMeal = function (mealData){
  var self = this;
  return Mongoose.model('Meal').create(mealData)
          .then(function(meal){
            self.meals.addToSet(meal._id);
            return self.save();
          })
}

chefSchema.methods.removeMeal = function(mealId){
  
}

mongoose.model('Chef', chefSchema);