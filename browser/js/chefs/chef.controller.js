app.controller('AllChefsController', function ($scope, allChefs) {

	$scope.allChefs = allChefs;

});

app.controller('ChefController', function ($scope, $state, ChefFactory,theChef, meals) {
	$scope.chef = theChef;
	$scope.meals = meals;
});