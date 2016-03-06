app.config(function($stateProvider) {
    $stateProvider.state('account', {
        // url: '/account',
        url: '/users/:id',
        templateUrl: 'js/account/account.html',
        controller: 'AccountCtrl', 
        resolve: {
            allTransactions: function(AccountFactory, $stateParams) {
                return AccountFactory.fetchAllTransactions($stateParams.id);
            }
        }
    });
})

app.controller('AccountCtrl', function($scope, $rootScope, AuthService, allTransactions) {

    $scope.allTransactions = allTransactions;

    $scope.log = function() {
        console.log("$scope.allTransactions: ", $scope.allTransactions)
    }

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