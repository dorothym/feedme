app.controller('CheckoutCtrl', function ($scope, CheckoutFactory, CartFactory, user, $state, userCart, localStorageService) {
  $scope.cart = CartFactory.getCartCache();
  
  if (user){
    $scope.user = user;
    $scope.checkoutUser = {
      firstname: user.firstName,
      lastname: user.lastName,
      address: user.homeAddress,
      zip: user.zip,
      borough: user.borough,
      phone: user.phoneNumber,
      email: user.email
    }
  }
  
  $scope.stripeCallback = function (code, result) {
    if (result.error) {
        window.alert('Stripe failed! error: ' + result.error.message);
    } else {
        window.alert('Stripe success! token: ' + result.id);
    }
  };

  $scope.confirmOrder = function() {
    CheckoutFactory.changeCartStatus(userCart._id)
      .then(function(){
        return CartFactory.getUserCart(user);
      })
      .then(function(){
          $state.go('confirmation', {
            order: $scope.cart,
            user: $scope.user,
            checkoutUser: $scope.checkoutUser,
            message: 'Order successfully placed!'
          });
      })

  }

});

