'use-strict'

app.factory('MealsFactory', function($http) {
	var MealsFactory = {};
	var allMeals = [];

	var cache = {
		'Meals': []
	}

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

	MealsFactory.updateCache = function(type, data) {
        if(data)  {
            cache[type].push(data)         
        }
        return cache[type];
    }


	return MealsFactory;

})