app.factory('CheckoutFactory', function($http, AuthService) {
  var CheckoutFactory = {};
  
  CheckoutFactory.userInfo = function () {
    return AuthService.getLoggedInUser()
  }
  
  return CheckoutFactory;
});
