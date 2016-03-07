app.controller('AllMealsController', function ($scope, allMeals, CartFactory) {
    $scope.ratings = [1,2,3,4,5]
    $scope.diets = ['Vegetarian','Vegan','Paleo','Gluten-free','Kosher','Halal', 'None', 'Dairy-free'];
    $scope.cuisines = ['Italian','Indian','French', 'Mediterrenean', 'Brazilian', 'Thai','New American','Chinese','Japanese','Vietnamese','Mexican','Peruvian','Food truck','Sandwiches','Pub food', 'Spanish'];


    $scope.allMeals =  allMeals;
        
    // Fow now this method only conssiders first element in diet array, needs refactoring
    $scope.updateMeals = function() {
        $scope.allMeals = $scope.allMeals.filter(function(meal) {
            if (!$scope.cuisine) return meal.diet[0] === $scope.diet;
            if(!$scope.diet) return meal.cuisine === $scope.cuisine;
            return meal.cuisine === $scope.cuisine && meal.diet[0] === $scope.diet
        })
    }

    $scope.resetMeals = function() {
        $scope.allMeals =  allMeals;
    }
    
    $scope.addMeal = function (meal){
      CartFactory.addMealToCart(meal);
    }


});
