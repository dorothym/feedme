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

app.controller('AccountCtrl', function($scope, $rootScope, AuthService, allTransactions, AccountFactory, ChefFactory, MealsFactory) {

    $scope.allTransactions = allTransactions;

    $scope.user = null;

   $scope.newMeal = {};
   $scope.updatedMeal= {};

   $scope.allMyMeals = function() {
    return ChefFactory.updateCache("Meals")
   }



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
        AccountFactory.addMeal(data);
        ChefFactory.updateCache("Meals", data);
        MealsFactory.updateCache("Meals", data);
    }

    $scope.updateMeal = function(mealId, data) {
        return AccountFactory.updateMeal(mealId, data)
    }


    setUser();

})