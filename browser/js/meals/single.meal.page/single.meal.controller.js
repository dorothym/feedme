app.controller('MealController', function ($scope, meal, ratings, chef, SingleMeal, CheckoutFactory) {

  $scope.meal = meal;

  $scope.ratings = ratings;
  
  $scope.chef = chef;

  $scope.avgRating = SingleMeal.getAvgRating(ratings);
  
  $scope.addMeal = function (meal){
    CheckoutFactory.addMealToCart(meal);
  }

});