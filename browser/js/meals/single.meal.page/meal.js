app.factory('SingleMeal', function($http){
  
  var SingleMeal = {};
  
  SingleMeal.getMeal = function(id){
    return $http.get('/api/meals/' + id)
    .then(function(res){
      return res.data.meal;
    });
  }
  
  SingleMeal.getRatings = function (id){
    return $http.get('/api/meals/' + id + '/rating')
    .then(function(res){
      return res.data
    })
  }
  
  SingleMeal.getChef = function (id){
    return $http.get('/api/meals/' + id)
    .then(function(res){
      return res.data.chef;
    });
  }
  
  return SingleMeal;
  
});

app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('meal', {
        url: '/meals/:id',
        controller: 'MealController',
        templateUrl: 'js/meals/single.meal.page/meal.html',
        resolve: {
          meal: function(SingleMeal, $stateParams){
            return SingleMeal.getMeal($stateParams.id);
          }
        }
    });

});
