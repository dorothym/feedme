'use-strict'

app.factory('AccountFactory', function($http) {
	var AccountFactory = {};

	var allTransactions = [];

	var cache = {
		'Transactions': []
	}

	function setCache(obj){
		angular.copy(obj.data, cache[obj.type])
		return cache[obj.type]; 
	}


	AccountFactory.fetchAllTransactions = function(userId) {
		return $http.get('/api/users/' + userId + '/transaction')
		.then(function extractData(response) {
			return {type: 'Transactions', data: response.data };
		})
		.then(setCache)

	}

	AccountFactory.addMeal = function(data) {
		return $http.post('/api/meals', data)
		.then(function(res) {
			return res.data;
		})
	}

	AccountFactory.updateMeal = function(mealId, data) {
		return $http.put('/api/meals/' + mealId, data)
		.then(function(res) {
			return res.data;
		})
	}

	return AccountFactory;

})