app.config(function($stateProvider) {

	$stateProvider.state('confirmation', {
		url: '/confirmation',
		templateUrl: 'js/checkout/confirmation/confirmation.html',
		controller: 'confirmationCtrl',
		params: {
			order: null,
			user: null,
			checkoutUser: null,
			message: null
		}

	})


})

app.controller('confirmationCtrl', function($scope, $stateParams, $http) {

	console.log("Stateparams",$stateParams)

	$scope.myOrder = $stateParams.order;
	$scope.dbUser = $stateParams.user;
	$scope.deliveryUser = $stateParams.checkoutUser;
	$scope.successMessage = $stateParams.message;

	console.log("order:",$scope.myOrder);
	console.log("dbUser:",$scope.dbUser);

	$scope.updateUserInfo = function() {
		// put to users ID api
		console.log("updating user info")
		return $http.put('/api/users/' + $scope.dbUser._id, $scope.deliveryUser)
		.then(function(updatedUser) {
			console.log("Updated user", updatedUser)
		}, function(err) {console.error("updateUserInfo error putting user data:",err)})
	}

	$scope.updateUserInfo();

})
