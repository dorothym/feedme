app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
          cart: function (CartFactory){
            return CartFactory.getUserCart();
          }
        }
    });
});