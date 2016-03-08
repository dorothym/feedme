app.controller('CartCtrl', function ($scope, CartFactory, $state) { 
  // testing local storage

  $scope.getCart = CartFactory.getCartCache;
  
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