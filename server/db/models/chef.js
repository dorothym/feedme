'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var userSchema = mongoose.model('User').schema;

var chefSchema = userSchema.extend({
  specialty: String,
  bio: String,
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

/*
AW: remember `bind` from bluebird!
we can rewrite addNewMeal like so: 

chefSchema.methods.addNewMeal = function (mealData){
  return Promise.resolve(mongoose.model('Meal').create(mealData)).bind(this)
  .then(function(meal){
    // because of `bind`, `this` now points to the document, not the promise, cool!
    this.meals.addToSet(meal._id);
    return this.save();
  });
}

*/

chefSchema.methods.removeMeal = function(mealData){
  var self = this;
  return mealData.remove()
        .then(function(){
          self.meals.pull(mealData)
          return self.save()
        });
}

mongoose.model('Chef', chefSchema);