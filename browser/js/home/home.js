app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl'

    });
});

app.controller('homeCtrl',function($scope,localStorageFactory,CartFactory,AuthService) {

	// console.log("in homepage controller")

	$scope.isLoggedIn = function () {
	    return AuthService.isAuthenticated();
	};

	function copyLocalCart() {

		// if we have not already checked for locally stored cart
		// and if user is not authenticated, copy locally stored cart to cached cart
		
		if(!localStorageFactory.alreadyFetchedLocalCart && !$scope.isLoggedIn() && localStorageFactory.getLocalCart().length > 0) {
			CartFactory.copyCartFromLocalStorage(localStorageFactory.getLocalCart());
			// console.log("just copied cart from local to cache",localStorageFactory.getLocalCart());
		}
		else if ($scope.isLoggedIn()) {
			// console.log("user is logged in. will not populate cache from local cart");
		}
		else {
			// console.log("already checked for local cart");
		}

	}

	copyLocalCart();

 
});