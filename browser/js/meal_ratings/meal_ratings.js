app.factory('MealRatingFactory',function($http, AuthService, $state, AccountFactory) {

    var MealRatingFactory = {};

    MealRatingFactory.submitRating = function (rating){
      return $http.post('/api/ratings', rating)
      .then(function(ratingFromDB){
        AccountFactory.addToRatingsCache(ratingFromDB);
        console.log('rating added: ', rating);
      });
    }
    
    return MealRatingFactory;
})

app.config(function ($stateProvider) {

    $stateProvider.state('addRating', {
        url: '/:id/add-rating',
        controller: 'RatingCtrl',
        templateUrl: 'js/meal_ratings/meal_ratings.html', 
        resolve: {
              meal: function($stateParams, SingleMeal){
                return SingleMeal.getMeal($stateParams.id)
              },
              user: function(AuthService){
                return AuthService.getLoggedInUser();
              }
            }
        });

});

app.controller('RatingCtrl', function ($scope, meal, user, MealRatingFactory, AccountFactory) {
	$scope.meal = meal;
    $scope.newRating = {
      meal: meal._id,
      author: user._id,
    };

  $scope.submitRating = function(rating) {
    return MealRatingFactory.submitRating(rating);
  }
  
  
});