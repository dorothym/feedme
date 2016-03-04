app.factory('ChefFactory',function($http) {

	var ChefFactory = {};

	ChefFactory.getChef = function(id) {
		console.log("inside chef factory. chefId passed is",id)
		return $http.get('/api/chefs/' + id);
	}

	return ChefFactory;
})