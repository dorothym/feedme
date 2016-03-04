app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('meal', {
        url: '/meal',
        controller: 'MealController',
        templateUrl: 'js/meals/single.meal.page/meal.html'
    });

});

app.controller('MealController', function ($scope) {

	$scope.angularTest = "hooray!"

    // Images of beautiful Fullstack people.
    // $scope.images = _.shuffle(FullstackPics);

});