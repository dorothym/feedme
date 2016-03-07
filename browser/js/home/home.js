app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl'
    });
});

app.controller('homeCtrl', function($scope, localStorageService) {

	var testval = 0;

  function submit(key, val) {
   	return localStorageService.set(key, val);
  }

  function getItem(key) { 	
   	return localStorageService.get(key);
  }

  $scope.changeItem = function() { 	
	var temp = getItem('testkey');
	temp++;
	console.log("incrementing storage value to",temp)
	submit('testkey',temp);
  }

  if(!getItem('testkey')) {
	  submit('testkey',testval);
  }


});