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
      var userInfo = {
        email: String(Math.floor(Math.random() * 1000000000))+'@fakeEmail.email',
        firstName: 'Dummy',
        lastName: 'User'
      }
      CartFactory.createDummyUser(userInfo)
      .then(function(guestUser){
        $state.go('guestCheckout', {guest: userInfo})
      });
    }
  }
  
});