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
  
  CheckoutFactory.getCart = function () {
    return AuthService.getLoggedInUser()
    .then(function (user){
      return $http.get('/api/users/' + user._id + '/transaction/cart')
    })
    .then(function(cart){
      return cart.data;
    })
  }
  
  CheckoutFactory.changeCartStatus = function (cartId) {
    return $http.put('/api/transactions/' + cartId, {status: 'Processing'})
            .then(function(response){
              console.log(response.data)
              })
              .catch(function(err){
                console.log(err)
              })
  }
  
  CheckoutFactory.createTransaction = function (guest, meals){
    var newTransaction = {
      customer: guest._id,
      meals: meals,
      status: 'Processing'
    }
    return $http.post('/api/transactions', newTransaction)
    .then(function(response){
      return response.data;
    })
  }
  
  return CheckoutFactory;
});
