app.factory('CartFactory', function($http,localStorageService) {
  var CartFactory = {};
  var cache = [];
  
  function setCache(meals){
      cache = angular.copy(meals)
      return cache; 
  }
  
  CartFactory.clearCache = function () {
    cache = [];
    return cache;
  }
  
  CartFactory.getUserCart = function (user){
      return $http.get('/api/users/' + user._id + '/transaction/cart')
      .then(function(cart){
        if (!cart.data) return makeCart(user);
        return cart.data.meals;
      })
      .then(setCache)
  }
  
  function makeCart (user){
      $http.post('/api/users/' + user._id + '/transaction', {customer: user._id, status: 'stillShopping'})
    .then(function(cart){
      return cart.data.meals;
    })
  }
  
  function updateCartOnDb () {
    $http.get('/session')
    .then(function(response){
      var user = response.data.user;
      return $http.put('/api/users/' + user._id + '/transaction/cart', {meals: cache})
    })
    .then(function(){
      return cache;
    })
  }
  
  // dmoore testing local storage
  CartFactory.copyCartFromLocalStorage = function(meals) {
    console.log("Before: meals is", meals,"\ncache is",cache);
    setCache(meals);
    console.log("After: meals is", meals,"\ncache is",cache);
  }

  CartFactory.deleteMealFromCart = function(meal){
    var i = cache.indexOf(meal);
    cache.splice(i, 1);
    // testing local storage // dmoore
    console.log("updating local storage - removing item");
    return localStorageService.set('mealsInCart',cache);
    updateCartOnDb();
  }
  
  CartFactory.addMealToCart = function (meal){
    cache.push(meal);
    // testing local storage // dmoore
    console.log("updating local storage - adding item")
    return localStorageService.set('mealsInCart',cache);
    updateCartOnDb();
  }
  
  CartFactory.getSubtotal = function () {
    var total = 0;
    cache.forEach(function(item){
      total+=item.price;
    })
    return total;
  }
  
  CartFactory.numItemsInCart = function () {
    return cache.length;
  }
  
  CartFactory.getCartCache = function () {
    return cache;
  }
  
  return CartFactory;
});

