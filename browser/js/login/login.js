app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl',
        params: {
            'successmessage': ''
          }
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state,$stateParams,localStorageService, CartFactory, localStorageFactory) {

    if($stateParams) {
        $scope.successmessage = $stateParams.successmessage;
        // console.log("success message", $scope.successmessage)
    };

    $scope.login = {};
    $scope.error = null;
  
    $scope.sendLogin = function (loginInfo) {

        testSubmitKey(); // testing local storage

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

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