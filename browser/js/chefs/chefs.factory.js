app.factory('ChefFactory',function($http) {

    var ChefFactory = {};
    var cache = {
        'AllChefs': [],
        'Chef': [],
        'Meals': []
    };

    function setCache(obj) {
        angular.copy(obj.data, cache[obj.type]);
        return cache[obj.type];
    }

    ChefFactory.updateCache = function(type, data) {
        if(data)  {
            cache[type].push(data)       
        }
        return cache[type];
    }


    ChefFactory.getAllChefs = function() {
        return $http.get('/api/chefs')
        .then(function(res) {
            return {type: 'AllChefs', data: res.data }
        })
        .then(setCache)
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
