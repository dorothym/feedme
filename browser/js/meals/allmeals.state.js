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


