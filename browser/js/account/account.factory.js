'use-strict'

app.factory('AccountFactory', function($http) {
	var AccountFactory = {};

	var allTransactions = [];

	var cache = {
		'Transactions': [],
        'Ratings' : []
	}

	function setCache(obj){
		angular.copy(obj.data, cache[obj.type])
		return cache[obj.type]; 
	}
  
    AccountFactory.getAllRatings = function(userId){
      return $http.get('/api/ratings?&author=' + userId)
      .then(function (response){
        return {type: 'Ratings', data: response.data}
      })
      .then(setCache)
    }
    
    AccountFactory.addToRatingsCache = function(data){
      cache.Ratings.push(data);
    }
    

	AccountFactory.fetchAllTransactions = function(userId) {
		return $http.get('/api/users/' + userId + '/transaction')
		.then(function (response) {
			return {type: 'Transactions', data: response.data };
		})
		.then(setCache)

	}

	return AccountFactory;

})