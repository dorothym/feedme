app.factory('CheckoutFactory', function($http, AuthService) {
  var CheckoutFactory = {};
  
  CheckoutFactory.userInfo = function () {
    return $http.get('/session')
          .then(function(response){
            var user = response.data.user;
            return user;
          });
  }
  
  return CheckoutFactory;
});
