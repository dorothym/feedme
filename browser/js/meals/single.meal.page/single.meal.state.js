'use strict';

app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('meal', {
        url: '/meals/:id',
        controller: 'MealController',
        templateUrl: 'js/meals/single.meal.page/meal.html',
        resolve: {
          meal: function(SingleMeal, $stateParams){
            return SingleMeal.getMeal($stateParams.id);
          },
          ratings: function(SingleMeal, $stateParams){
            return SingleMeal.getRatings($stateParams.id);
          },
          chef: function(SingleMeal, $stateParams){
            return SingleMeal.getChef($stateParams.id);
          },
          cart: function (CartFactory){
              return CartFactory.getUserCart();
          }
        }
    });

});