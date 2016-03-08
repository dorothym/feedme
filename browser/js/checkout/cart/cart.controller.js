app.controller('CartCtrl', function ($scope, CartFactory, $state, Session) { 
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
    if (!!Session.user){
      $state.go('checkout')
    }else {
      $state.go('guestCheckout')
    }
  }
  
});