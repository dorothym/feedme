app.controller('AllChefsController', function ($scope) {

	$scope.angularTest = "successful"

});

app.controller('ChefController', function ($scope, $state, ChefFactory,theChef, meals) {
	$scope.chef = theChef;
	$scope.meals = meals;

	console.log(meals)

});