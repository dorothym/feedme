app.controller('CheckoutCtrl', function ($scope, cart, user, CheckoutFactory) {
  $scope.cart = cart;
  
  if (user){
    $scope.user = user;
    $scope.checkoutUser = {
      firstname: user.firstName,
      lastname: user.lastName,
      address: user.homeAddress,
      zip: user.zip,
      borough: user.borough,
      phone: user.phone,
      email: user.email
    }
  }
  
  $scope.stripeCallback = function (code, result) {
    if (result.error) {
        window.alert('it failed! error: ' + result.error.message);
    } else {
      console.log(result)
        window.alert('success! token: ' + result.id);
    }
  };
  
});

