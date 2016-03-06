app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl', 
        resolve: {
        	allUsers: function(AdminFactory) {
        		return AdminFactory.fetchAllUsers();
        	}
        }
    });

});

app.controller('AdminCtrl', function ($scope, AuthService, $state, allUsers, AdminFactory) {
	$scope.allUsers = allUsers;
    $scope.removeUser = function() {
    	AdminFactory.removeUser();
    }

});

app.factory('AdminFactory', function($http) {
	var AdminFactory = {};

	AdminFactory.fetchAllUsers = function() {
		return $http.get('/api/users')
		.then(function(res) {
			return res.data;
		})
	}

	AdminFactory.removeUser = function(id) {
		return $http.delete('/api/users/' + id)
		.then(function(res) {
			return res.data;
		})
	}

	return AdminFactory;
})