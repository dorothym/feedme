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
   
  SingleMeal.getAvgRating = function (ratings){
    if (ratings.length === 0) return 0;
    var sum = ratings.reduce(function(prev, curr){
      // AW: i think this needs to be: 
      // return prev + Number(curr.rating)
      // a better name for `prev` is `runningTotal`
      return Number(prev.rating) + Number(curr.rating);
    });

  
    return Math.floor(sum/ratings.length)
  }
  
  SingleMeal.getChef = function (id){
    return $http.get('/api/meals/' + id)
    .then(function(res){
      return res.data.chef;
    });
  }
  
  return SingleMeal;
  
});
