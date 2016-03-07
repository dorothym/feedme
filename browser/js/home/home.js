app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl'

    });
});

app.controller('homeCtrl',function($scope,localStorageFactory,CartFactory) {

	if(!localStorageFactory.alreadyFetchedLocalCart) {
		CartFactory.copyCartFromLocalStorage(localStorageFactory.getLocalCart());
		console.log("just copied cart from local to cache",tempCart);
	}
	else {
		console.log("else")
	}
	$scope.testvar = localStorageFactory.blah;
 
})