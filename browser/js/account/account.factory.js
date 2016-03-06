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
	// AccountFactory.fetchAllTransactions = function(id) {
	// 	return $http.get('/api/users/' + id + '/transaction')
	// 	.then(function(res) {
	// 		return res.data;
	// 	})
	// }



	return AccountFactory;

})