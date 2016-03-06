app.factory('CheckoutFactory', function($http, AuthService) {
  var CheckoutFactory = {};
  var cache = { 'Content' : [] }
  
  function setCache(obj){
      angular.copy(obj.data, cache[obj.type])
      return cache[obj.type]; 
  }
  
  CheckoutFactory.getUserCart = function (){
    return AuthService.getLoggedInUser()
    .then(function(user){
      return $http.get('/api/users/' + user._id + '/transaction/cart')
    })
    .then(function(cart){
      return {type: 'Content', data: cart.data.meals}
    })
    .then(setCache)
  }
    
  CheckoutFactory.deleteMealFromCart = function(meal){
    var i = cache.Content.indexOf(meal);
    var mealToDelete = cache.Content.splice(i, 1);
    return AuthService.getLoggedInUser()
    .then(function(user){
      $http.put('/api/users/' + user._id + '/transaction/cart', {meals: cache.Content});
    })
  }
  
  CheckoutFactory.addMealToCart = function (meal){
    cache.Content.push(meal);
    return AuthService.getLoggedInUser()
    .then(function(user){
      $http.put('/api/users/' + user._id + '/transaction/cart', {meals: cache.Content});
    })
  }
  
  return CheckoutFactory;
});

app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/cart',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
          cart: function (CheckoutFactory) {
            return CheckoutFactory.getUserCart();
          }
        }
    });

});

app.controller('CheckoutCtrl', function ($scope, cart, CheckoutFactory) {

  $scope.cart = cart;
  
  $scope.removeFromCart = function (meal){
    CheckoutFactory.deleteMealFromCart(meal)
  }
  
});