app.factory('CartFactory', function($http, AuthService) {
  var CartFactory = {};
  var cache = { 'Content' : [] }
  
  function setCache(obj){
      angular.copy(obj.data, cache[obj.type])
      return cache[obj.type]; 
  }
  
  CartFactory.getUserCart = function (){
    return AuthService.getLoggedInUser()
    .then(function(user){
      return $http.get('/api/users/' + user._id + '/transaction/cart')
    })
    .then(function(cart){
      return {type: 'Content', data: cart.data.meals}
    })
    .then(setCache)
  }
  
  CartFactory.deleteMealFromCart = function(meal){
    var i = cache.Content.indexOf(meal);
    var mealToDelete = cache.Content.splice(i, 1);
    return AuthService.getLoggedInUser()
    .then(function(user){
      $http.put('/api/users/' + user._id + '/transaction/cart', {meals: cache.Content});
    })
  }
  
  CartFactory.numItemsInCart = function () {
    return cache.Content.length;
  }
  
  CartFactory.addMealToCart = function (meal){
    cache.Content.push(meal);
    return AuthService.getLoggedInUser()
    .then(function(user){
      $http.put('/api/users/' + user._id + '/transaction/cart', {meals: cache.Content});
    })
  }
  
  return CartFactory;
});

app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/cart',
        templateUrl: 'js/checkout/cart/cart.html',
        controller: 'CartCtrl',
        resolve: {
          cart: function (CartFactory) {
            return CartFactory.getUserCart();
          }
        }
    });

});

app.controller('CartCtrl', function ($scope, cart, CartFactory) {

  $scope.cart = cart;
  
  $scope.removeFromCart = function (meal){
    CartFactory.deleteMealFromCart(meal)
  }
  
});