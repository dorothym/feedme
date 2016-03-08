app.controller('CheckoutCtrl', function ($scope, CheckoutFactory, CartFactory, user, $state, userCart, localStorageService, $stateParams) {
  $scope.cart = CartFactory.getCartCache();
  console.log('guest?', $stateParams.guest)
  
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

//this is a bit repetitious...
app.controller('GuestCheckoutCtrl', function ($scope, CheckoutFactory, CartFactory, localStorageService, $stateParams, guest, $state) {
  $scope.cart = localStorageService.get('mealsInCart');
  
  $scope.user = guest;
  
  $scope.stripeCallback = function (code, result) {
    if (result.error) {
        window.alert('Stripe failed! error: ' + result.error.message);
    } else {
        window.alert('Stripe success! token: ' + result.id);
    }
  };

  $scope.confirmOrder = function() {
    console.log($scope.user, $scope.cart)
        return CheckoutFactory.createTransaction($scope.user, $scope.cart)
        .then(function(){
        console.log('before states')
          $state.go('confirmation', {
            order: $scope.cart,
            user: $scope.user,
            checkoutUser: $scope.checkoutUser,
            message: 'Order successfully placed!'
          });
      })

  }

});

