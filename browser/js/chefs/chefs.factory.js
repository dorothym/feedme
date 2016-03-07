app.factory('ChefFactory',function($http) {

    var ChefFactory = {};
    var cache = {
        'Chef': [],
        'Meals': []
    };

    function setCache(obj) {
        angular.copy(obj.data, cache[obj.type]);
        return cache[obj.type];
    }

    ChefFactory.getChef = function(id) {
        return $http.get('/api/chefs/' + id)
        .then(function(res) {
            return {type: 'Chef', data: res.data }
        })
        .then(setCache)
    }

    ChefFactory.getMeals = function(id) {
        return $http.get('/api/chefs/' + id + "/meal")
        .then(function extractData(res) {
            return {type: 'Meals', data: res.data };
        })
        .then(setCache)

    }

    return ChefFactory;
})
