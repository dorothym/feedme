app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/checkout/cart/cart.html',
        controller: 'CartCtrl'
    });

}); 
