'use-strict'

app.factory('MealsFactory', function($http) {
	var MealsFactory = {};
	var allMeals = [];

	function setCache(meals){
		angular.copy(meals, allMeals)
		return allMeals; 
	}

	MealsFactory.fetchAllMeals = function() {
		return $http.get('/api/meals')
		.then(function extractData(response) {
			return response.data;
		})
		.then(setCache)
		
	}


	// MealsFactory.fetchAllCuisines = function() {
	// 	return $http.get('/api/')
	// }

	return MealsFactory;

})