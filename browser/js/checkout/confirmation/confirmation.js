app.config(function($stateProvider) {

	$stateProvider.state('confirmation', {
		url: '/confirmation',
		templateUrl: 'js/checkout/confirmation/confirmation.html',
		controller: 'confirmationCtrl',
		params: {
			order: null,
			user: null,
			checkoutUser: null,
			successMessage: null
		}

	})


})

app.controller('confirmationCtrl', function($scope, $stateParams) {

	console.log("Stateparams",$stateParams)

	$scope.myOrder = $stateParams.order;
	$scope.dbUser = $stateParams.user;
	$scope.deliveryUser = $stateParams.checkoutUser;
	$scope.successMessage = $stateParams.message;

	console.log("order:",$scope.myOrder);
	console.log("checkout user:",$scope.checkoutUser);
})
