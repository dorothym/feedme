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

app.controller('AccountCtrl', function($scope, $rootScope, AuthService, allTransactions, AccountFactory) {

    $scope.allTransactions = allTransactions;

   $scope.user = null;

   $scope.newMeal ={};

   $scope.isLoggedIn = function () {
        return AuthService.isAuthenticated();
    };

    var setUser = function () {
        AuthService.getLoggedInUser().then(function (user) {
           $scope.user = user;
        });
    };

    $scope.isChef = function() {
        // TBD. for now return true
        return true;
    }

    $scope.addMeal = function(data) {
        return AccountFactory.addMeal(data)
    }

    $scope.logMeal = function() {
        console.log($scope.newMeal)
        console.log($scope.user)
    }

    setUser();

})