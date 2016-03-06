app.factory('CartFactory', function($http, AuthService) {
  var CartFactory = {};
  var cache = { 'Content' : [] }
  
  function setCache(obj){
      angular.copy(obj.data, cache[obj.type])
      return cache[obj.type]; 
  }
  
  CartFactory.getUserCart = function (){
    if (!AuthService.isAuthenticated()) return {type: 'Content', data: []};
    else {
      return AuthService.getLoggedInUser()
      .then(function(user){
        return $http.get('/api/users/' + user._id + '/transaction/cart')
      })
      .then(function(cart){
        if (!cart.data) return makeCart();
        return {type: 'Content', data: cart.data.meals}
      })
      .then(setCache)
    }
  }
  
  function makeCart (){
    AuthService.getLoggedInUser()
    .then(function(user){
      $http.post('/api/users/' + user._id + '/transaction', {customer: user._id, status: 'stillShopping'})
    })
    .then(function(cart){
      return {type: 'Content', data: cart.data.meals}
    })
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
  
  CartFactory.getSubtotal = function () {
    var total = 0;
    cache.Content.forEach(function(item){
      total+=item.price;
    })
    return total;
  }
  
  return CartFactory;
});

app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
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

app.controller('CartCtrl', function ($scope, cart, CartFactory, $state) {

  $scope.cart = cart;
  
  $scope.addAnotherToCart = function (meal){
    CartFactory.addMealToCart(meal);
  }
  
  $scope.removeFromCart = function (meal){
    CartFactory.deleteMealFromCart(meal);
  }
  
  $scope.subTotal = CartFactory.getSubtotal();
  
  $scope.checkout = function () {
    $state.go('checkout')
  }
  
});