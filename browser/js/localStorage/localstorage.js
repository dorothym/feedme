//localstorage.js

app.factory('localStorageFactory', function(localStorageService) {

	var localStorageFactory = {};

	localStorageFactory.alreadyFetchedLocalCart = false;

	localStorageFactory.getLocalCart = function() {
		// console.log("inside getLocalCart")
	   localStorageFactory.alreadyFetchedLocalCart = true;
	   
	   if(localStorageService.get('mealsInCart')) {
	   		// console.log("found meals in cart")
		   return localStorageService.get('mealsInCart');	   	
	   }
	   else {
	   	// console.log("local cart is empty")
	   	return [];
	   }
	   
	}

	// localStorageFactory.setLocalCart = function() {
	//    localStorageFactory.alreadyFetchedLocalCart = true;
	//    return localStorageService.set('mealsInCart');
	//    // var temp = localStorageService.get('test');
	//    // console.log("foo is now",temp)
	// }

	return localStorageFactory;
});