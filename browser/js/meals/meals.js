// meals.js

app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('allMeals', {
        url: '/meals',
        controller: 'AllMealsController',
        templateUrl: 'js/meals/allmeals.html'
    });

});

app.controller('AllMealsController', function ($scope) {

	$scope.angularTest = "successful"

    // Images of beautiful Fullstack people.
    // $scope.images = _.shuffle(FullstackPics);

});

app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('meal', {
        url: '/meal',
        controller: 'MealController',
        templateUrl: 'js/meals/meal.html'
    });

});

app.controller('MealController', function ($scope) {

	$scope.angularTest = "hooray!"

    // Images of beautiful Fullstack people.
    // $scope.images = _.shuffle(FullstackPics);

});