app.controller('MealController', function ($scope, meal, ratings, chef, SingleMeal, CartFactory) {

  $scope.meal = meal;

  $scope.ratings = ratings;
  
  $scope.chef = chef;

  $scope.avgRating = SingleMeal.getAvgRating(ratings);
  
  $scope.addMeal = function (meal){
    CartFactory.addMealToCart(meal);
  }

});