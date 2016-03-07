app.factory('MealRatingFactory',function($http) {

    var MealRatingFactory = {};

    return MealRatingFactory;
})

app.config(function ($stateProvider) {

    $stateProvider.state('addRating', {
        url: '/add-rating',
        controller: 'RatingCtrl',
        templateUrl: 'js/meal_ratings/meal_ratings.html', 
        resolve: {
              //
            }
        });

});

app.controller('RatingCtrl', function ($scope) {
	
});