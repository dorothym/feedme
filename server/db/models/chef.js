'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var userSchema = mongoose.model('User').schema;

var ratingRange = [1,2,3,4,5];

var chefSchema = userSchema.extend({
  specialty: String,
  bio: String,
  rating: {
    type: Number,
    enum: ratingRange
  },
  meals: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Meal'
  }]
});

chefSchema.methods.addNewMeal = function (mealData){
  var self = this;
  return mongoose.model('Meal').create(mealData)
          .then(function(meal){
            self.meals.addToSet(meal._id);
            return self.save();
          });
}

chefSchema.methods.removeMeal = function(mealData){
  var self = this;
  return mealData.remove()
        .then(function(){
          self.meals.pull(mealData)
          return self.save()
        });
}

mongoose.model('Chef', chefSchema);