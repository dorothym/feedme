'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var userSchema = mongoose.model('User').schema;

var chefSchema = userSchema.extend({
  specialty: String,
  bio: String,
  // sballan Consider validating the value of the rating.
  rating: {
    type: Number,
    default: 0
  },
  meals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
  }]
});

// sballan consider static to get chefs by rating, or even by average meal rating.
chefSchema.methods.addNewMeal = function (mealData){
  var self = this;

  // sballan Careful about capital M
  return Mongoose.model('Meal').create(mealData)
          .then(function(meal){
            self.meals.addToSet(meal._id);
            return self.save();
          })
          /*
            .then(function(chef) {
              return <new meal variable>
            })
          */
}

chefSchema.methods.removeMeal = function(mealData){
  //does .pull in mongoose work like array methods 'pull' or finds specific item and removes it?
  // sballan You can do mealData.remove()
  var self = this;
  return mongoose.model('Meal').findByIdAndRemove(mealData._id)
  .then(function(){
    self.meals.pull(mealData)
    return self.save()
  });
}

mongoose.model('Chef', chefSchema);