app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup/:isChef',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state, $http, $stateParams,localStorageFactory, CartFactory) {

    $scope.log = function() {
        SignupFactory.signup()
    }
    $scope.successmessage = null;
    

    // console.log("stateparams:",$stateParams)

    $scope.signup = {};
    $scope.error = null;

    $scope.showChef = $stateParams.isChef;
    // console.log("is chef =",$scope.showChef)

    var postRoute;
    if($stateParams.showChef) {
        postRoute = 'api/chefs';
    }
    else {
        postRoute= 'api/users';
    }


    $scope.sendsignup = function (signupInfo) {
        return $http.post(postRoute, signupInfo)
        .then(function(newUser) {
                $state.go('login',{
                    successmessage: 'Successful signup! Please log in.'
                });
            })
            .catch(function (err) {
                // console.log('err after all ', err)
                $scope.error = 'Invalid signup credentials.'
            });
    }

    $scope.isLoggedIn = function () {
        return AuthService.isAuthenticated();
    };

    // if we have not already checked for locally stored cart
    // and if user is not authenticated, copy locally stored cart to cached cart

    function copyLocalCart() {
        if(!localStorageFactory.alreadyFetchedLocalCart && !$scope.isLoggedIn() && localStorageFactory.getLocalCart().length > 0) {
            CartFactory.copyCartFromLocalStorage(localStorageFactory.getLocalCart());
        }
    }

    copyLocalCart();
});
