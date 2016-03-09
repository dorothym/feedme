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
            },
            /*
                AW:  better to get the user here, not in the controller 
                

            user: function(AuthService){
                return AuthService.getLoggedInUser()
            }
            
            */
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


    // AW: why do this here? why not add this to the resolve block for this state?
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
        // AW: could do: 
        // return $scope.user.type === "Chef"
        if($scope.user.type === "Chef") return true;
    }
    
    $scope.isRatable = function (status, mealId){
      
      return status==='Delivered' && !allRatings.filter(function(rating){
        return rating.meal._id === mealId;
      }).length;
    }
    
    $scope.ratingNum = function (mealId){

        // AW: lodash find is food here because it returns the item, not an array
        /*
            return _.find(allRatings, function (rating){
                return rating.meal._id === mealId && rating.rating
            }).rating 


        */
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
        // AW: why aren't we `then`-ing on this promise?
        // where's the error handling for this promise?
        AccountFactory.addMeal(data);
    }

    $scope.updateMeal = function(meal) {
        AccountFactory.updateMeal(meal)
        .then(function(newMeal) {
           return newMeal;  //AW: no need to return here
        })
    }

    $scope.removeMeal = function(meal) {
        // AW: this is asynchronous! you don't want to remove from 
        // the cache unless the call to the DB is successful!
        AccountFactory.removeMeal(meal);
        ChefFactory.updateCache("Meals", meal, "removeFromCache")

        /* AW: this is better: 
         AccountFactory.removeMeal(meal)
         .then(function(){
            ChefFactory.updateCache("Meals", meal, "removeFromCache")            
         })

        */
    }


    setUser();
    
    console.log("scope user: ",$scope.user)    
   

    

})