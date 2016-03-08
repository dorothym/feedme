'use-strict'

app.factory('MealsFactory', function($http, SingleMeal) {
	var MealsFactory = {};
	var allMeals = [];

	var cache = {
		'Meals': []
	}
    //written differently than meal cache becaue i did not want to write over something ksenia was working on :)
    var ratingCache = [];

	function setCache(obj){
		angular.copy(obj.data, cache[obj.type])
		return cache[obj.type]; 
	}

	MealsFactory.fetchAllMeals = function() {
		return $http.get('/api/meals')
		.then(function extractData(response) {
			return {type: 'Meals', data: response.data };
		})
		.then(setCache)
	}

	return MealsFactory;

})