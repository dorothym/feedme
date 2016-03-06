app.factory('ChefFactory',function($http) {

	var ChefFactory = {};
	var cache = [];

	function setCache(obj) {
		angular.copy(obj, cache)
	}

	ChefFactory.getChef = function(id) {
		// console.log("inside chef factory. chefId passed is",id)
		return $http.get('/api/chefs/' + id)
		.then
	}

	return ChefFactory;
})