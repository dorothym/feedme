app.config(function($stateProvider) {
    $stateProvider.state('account', {
        url: '/account',
        templateUrl: 'js/account/account.html',
        controller: 'AccountCtrl'
    });
})

app.controller('AccountCtrl', function($scope, $rootScope, AuthService) {

   $scope.user = null;

   $scope.isLoggedIn = function () {
        return AuthService.isAuthenticated();
    };

    var setUser = function () {
        AuthService.getLoggedInUser().then(function (user) {
           $scope.user = user;
        });
    };

    setUser();

})