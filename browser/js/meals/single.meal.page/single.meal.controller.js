app.controller('MealController', function ($scope, meal, ratings, chef, SingleMeal) {

  $scope.meal = meal;

  $scope.ratings = ratings;
  console.log(ratings)

  $scope.chef = chef;

  $scope.avgRating = SingleMeal.getAvgRating(ratings);

});