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
	$scope.updated = false;
	$scope.showForm = false;
	$scope.updatedUser ={};

	$scope.showUpdateForm = function(user) {
		$scope.showForm = true;
	}

    $scope.removeUser = function(userId) {
    	$scope.updated = true;
    	$scope.action = "removed";
    	AdminFactory.removeUser(userId);
    }


    $scope.updateUser = function(userId, data) {
    	console.log('USER ID: ', userId)
    	console.log('USER DATA: ', data)
    	$scope.updated = true;
    	$scope.action = "updated";
    	AdminFactory.updateUser(userId, data);
    }

    $scope.assignAdmin = function(userId) {
    	$scope.updated = true;
    	$scope.action = "assign as an admin";
    	AdminFactory.assignAdmin(userId);
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
 	
 	AdminFactory.assignAdmin = function(id) {
		return $http.put('/api/users/' + id, {admin: true})
	}

	AdminFactory.updateUser = function(id, data) {
		return $http.put('/api/users/' + id, data)
	}

	return AdminFactory;
})


