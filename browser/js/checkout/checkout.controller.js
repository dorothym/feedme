app.controller('CheckoutCtrl', function ($scope, CheckoutFactory, CartFactory, user, $state) {
  $scope.cart = CartFactory.getCartCache();

  console.log("User",user,"\nCart",$scope.cart)
  
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
      console.log(result)
        window.alert('Stripe success! token: ' + result.id);
    }
  };

  $scope.confirmOrder = function() {
    console.log("confirming order")
    $state.go('confirmation', {
      order: $scope.cart,
      user: $scope.user,
      checkoutUser: $scope.checkoutUser,
      message: 'Order successfully placed!'
    })
    // $state.go('confirmation')
  }
  
});

