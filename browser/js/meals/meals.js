// meals.js

app.config(function ($stateProvider) {
    // Register our *about* state.
    $stateProvider.state('allMeals', {
        url: '/meals',
        controller: 'AllMealsController',
        templateUrl: 'js/meals/allmeals.html', 
        resolve: {
            allMeals: function(MealsFactory) {
                return MealsFactory.fetchAllMeals();
            }
        }
    });

});

app.controller('AllMealsController', function ($scope, allMeals) {

    $scope.diets = ['Vegetarian','Vegan','Paleo','Gluten-free','Kosher','Halal', 'None', 'Dairy-free'];
    $scope.cuisines = ['Italian','Indian','French', 'Mediterrenean', 'Brazilian', 'Thai','New American','Chinese','Japanese','Vietnamese','Mexican','Peruvian','Food truck','Sandwiches','Pub food', 'Spanish'];

    $scope.allMeals =  allMeals;
});
