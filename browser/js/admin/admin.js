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
    $scope.userType = function(user) {
        if(user.type === "Chef" && user.admin) {
            return "Chef / Admin"
        } else if(user.type === "Chef") {
            return "Chef"
        } else if(user.admin) {
            return "Admin"
        } else {
            return "Buyer"
        }
    }

	$scope.showUpdateForm = function(user) {
		$scope.showForm = true;
	}

    $scope.removeUser = function(user) {
    	$scope.updated = true;
    	$scope.action = "removed";
    	AdminFactory.removeUser(user);
    }

    $scope.updateUser = function(user, data) {
    	$scope.updated = true;
    	$scope.action = "updated";
    	AdminFactory.updateUser(user, data);
    }

    $scope.assignAdmin = function(user) {
        $scope.updated = true;
        AdminFactory.assignAdmin(user);
        if(!user.admin) {
            $scope.action = "assigned as an admin";
        } else  {
            $scope.action = "removed as an admin";
        }
    }

});

app.factory('AdminFactory', function($http) {
	var AdminFactory = {};

    var cache = [];

    function setCache(obj) {
        angular.copy(obj, cache)
        return cache;
    }


	AdminFactory.fetchAllUsers = function() {
		return $http.get('/api/users')
		.then(function(res) {
			return res.data;
		})
         // .then(setCache)
	}

	AdminFactory.removeUser = function(user) {
        var index = cache.indexOf(user);
        var userToRemove = cache.splice(index, 1)
		return $http.delete('/api/users/' + user._id)
       
	}
 	
 	AdminFactory.assignAdmin = function(user) {
            if(!user.admin)
    		    return $http.put('/api/users/' + user._id, {admin: true})
            else 
                return $http.put('/api/users/' + user._id, {admin: false})    
	}

    AdminFactory.removeAdmin = function(user) {
        return $http.put('/api/users/' + user._id, {admin: false})
    }

	AdminFactory.updateUser = function(user, data) {
		return $http.put('/api/users/' + user._id, data)
	}

	return AdminFactory;
})


