// meals.js

app.config(function ($stateProvider) {
    $stateProvider.state('allMeals', {
        url: '/meals',
        controller: 'AllMealsController',
        templateUrl: 'js/meals/allmeals.html', 
        resolve: {
            allMeals: function(MealsFactory) {
                return MealsFactory.fetchAllMeals();
            },
            allRatings: function(MealsFactory){
              return MealsFactory.getAllRatings();
            }
        }
    });

});
