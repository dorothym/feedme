//app.config(function ($stateProvider) {
//
//    // Register our *singleMeal* state.
//    $stateProvider.state('single.meal', {
//        url: '/meals/:id',
//        templateUrl: 'js/meals/single.meal.page/meal.html',
//        resolve: {
//          meal: function (SingleMeal, $stateParams){
//            return SingleMeal.getMeal($stateParams.id);
//          }
//        },
//      controller: 'MealController'
//    });
//
//});