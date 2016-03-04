app.controller('MealController', function ($scope, meal, SingleMeal, $stateParams) {

	$scope.meal = meal;
    
    SingleMeal.getRatings($stateParams.id)
    .then(function(ratings){
      $scope.ratings = ratings;
    });
  
  SingleMeal.getChef($stateParams.id)
  .then(function(chef){
    $scope.chef = chef;
  })
  
});