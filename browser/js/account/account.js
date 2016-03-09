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
            allRatings: function(AccountFactory, $stateParams){
              return AccountFactory.getAllRatings($stateParams.id);
            },
            getAllMeals: function(ChefFactory, $stateParams){
              return ChefFactory.getMeals($stateParams.id)
            }
        }
    });
})

app.controller('AccountCtrl', function($scope, $rootScope, AuthService, allTransactions, AccountFactory, ChefFactory, MealsFactory, allRatings, getAllMeals) {



    $scope.allTransactions = allTransactions;

    $scope.allRatings = allRatings;

    $scope.allMyMeals = getAllMeals;

    $scope.newMeal = {};
    //$scope.updatedMeal= {};

    $scope.allCuisines = ['Italian','Indian','French', 'Mediterrenean', 'Brazilian', 'Thai','New American','Chinese','Japanese','Vietnamese','Mexican','Peruvian','Food truck','Sandwiches','Pub food', 'Spanish']
    
    $scope.isLoggedIn = function () {
        return AuthService.isAuthenticated();
    };

    var setUser = function () {
        console.log("setting user...")
        AuthService.getLoggedInUser()
        .then(function (theUser) {
            console.log("user is set to",theUser)
           $scope.user = theUser;
        });
    };

    $scope.isChef = function() {
        // TBD. for now return true
        if($scope.user.type === "Chef") return true;
    }
    
    $scope.isRatable = function (status, mealId){
      
      return status==='Delivered' && !allRatings.filter(function(rating){
        return rating.meal._id === mealId;
      }).length;
    }
    
    $scope.ratingNum = function (mealId){
      return allRatings.filter(function(rating){
        return rating.meal._id === mealId && rating.rating
      })[0].rating;
    }

    $scope.isAdmin =  function() {
        return $scope.user.admin;
    }

    $scope.addMeal = function(data) {
        ChefFactory.updateCache("Meals", data, "addToCache");
        MealsFactory.updateCache("Meals", data);
        AccountFactory.addMeal(data);
    }

    $scope.updateMeal = function(meal) {
        AccountFactory.updateMeal(meal)
        .then(function(newMeal) {
           return newMeal;
        })
    }

    $scope.removeMeal = function(meal) {
        AccountFactory.removeMeal(meal);
        ChefFactory.updateCache("Meals", meal, "removeFromCache")
    }


    setUser();
    
    console.log("scope user: ",$scope.user)    
   

    

})