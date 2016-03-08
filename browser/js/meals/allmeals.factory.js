'use-strict'

app.factory('MealsFactory', function($http, SingleMeal) {
	var MealsFactory = {};
	var allMeals = [];

	var cache = {
		'Meals': []
	}
    
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
    
    MealsFactory.getAllRatings = function(){
      return $http.get('/api/ratings')
      .then(function(ratings){
        ratingCache = angular.copy(ratings.data);
        return ratingCache;
      });
    }



	return MealsFactory;

})