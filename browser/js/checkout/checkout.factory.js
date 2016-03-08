app.factory('CheckoutFactory', function($http, AuthService) {
  var CheckoutFactory = {};

  var tempUser, tempTransactionId;
  
  CheckoutFactory.userInfo = function () {
    return $http.get('/session')
          .then(function(response){
            var user = response.data.user;
            tempUser = user;
            return user;
          });
  }

  CheckoutFactory.processTransaction = function() {
  	// console.log("customer is",tempUser)
  	// console.log("transaction ID is",tempTransactionId)
  	// here is where I want to set the transaction status to Processing
  	// but I don't know how to find the transaction ID
  }
  
  return CheckoutFactory;
});
