app.config(function($stateProvider) {
    $stateProvider.state('account', {
        // url: '/account',
        url: '/users/:id',
        templateUrl: 'js/account/account.html',
        controller: 'AccountCtrl', 
        resolve: {
            allTransactions: function(AccountFactory, $stateParams) {
                return AccountFactory.fetchAllTransactions($stateParams.id);
            }, 
            getAllMeals: function(ChefFactory, $stateParams) {
                return ChefFactory.getMeals($stateParams.id)
            }

        }
    });
})

app.controller('AccountCtrl', function($scope, $rootScope, AuthService, allTransactions, AccountFactory, ChefFactory, MealsFactory, getAllMeals) {

    $scope.allTransactions = allTransactions;

    $scope.user = null;

    $scope.allMyMeals = getAllMeals;

   $scope.newMeal = {};
   $scope.updatedMeal= {};


    $scope.allCuisines = ['Italian','Indian','French', 'Mediterrenean', 'Brazilian', 'Thai','New American','Chinese','Japanese','Vietnamese','Mexican','Peruvian','Food truck','Sandwiches','Pub food', 'Spanish']
    
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
        if($scope.user.type === "Chef")
            return true;
    }

    $scope.isAdmin =  function() {
        return $scope.user.admin;
    }

    $scope.addMeal = function(data) {
        ChefFactory.updateCache("Meals", data, "addToCache");
        MealsFactory.updateCache("Meals", data);
        AccountFactory.addMeal(data);
    }

    $scope.updateMeal = function(mealId, data) {
        AccountFactory.updateMeal(mealId, data)
        console.log("Hello again!")
        console.log(mealId, data)
    }

    $scope.removeMeal = function(meal) {
        AccountFactory.removeMeal(meal);
        ChefFactory.updateCache("Meals", meal, "removeFromCache")
    }


    setUser();

})