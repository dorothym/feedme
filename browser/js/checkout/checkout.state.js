app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
          user: function(CheckoutFactory){
            return CheckoutFactory.userInfo();
          },
          userCart: function(CheckoutFactory){
            return CheckoutFactory.getCart();
          }
        }
    });

});

app.config(function ($stateProvider) {

    $stateProvider.state('guestCheckout', {
        url: '/guest/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'GuestCheckoutCtrl',
//        params: {
//          guest: null
//        }
        resolve: {
          guest: function(CartFactory){
            var userInfo = {
              email: String(Math.floor(Math.random() * 1000000000))+'@fakeEmail.email',
              firstName: 'Dummy',
              lastName: 'User'
            }
            return CartFactory.createDummyUser(userInfo)
          }
        }
    });

});