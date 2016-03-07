app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state, $http, $rootScope) {

    $scope.log = function() {
        SignupFactory.signup()
    }
    $scope.successmessage = null;
    

    $scope.signup = {};
    $scope.error = null;

    $scope.isChef = function() {
        return false;
    }

    $scope.sendsignup = function (signupInfo) {
        return $http.post('api/users', signupInfo)
        .then(function(newUser) {
                $rootScope.newUser = true;
                $state.go('login');
            })
            .catch(function (err) {
                // console.log('err after all ', err)
                $scope.error = 'Invalid signup credentials.'
            });
    }
});

app.config(function ($stateProvider) {

    $stateProvider.state('chefsignup', {
        url: '/chefsignup',
        templateUrl: 'js/signup/signup.html',
        controller: 'ChefSignupCtrl'
    });

});

app.controller('ChefSignupCtrl', function ($scope, AuthService, $state, $http, $rootScope) {

    $scope.log = function() {
        SignupFactory.signup()
    }
    $scope.successmessage = null;
    
    $scope.isChef = function() {
        return true;
    }

    $scope.signup = {};
    $scope.error = null;

    $scope.sendsignup = function (signupInfo) {
        console.log('chef signup')
        return $http.post('api/users', signupInfo)
        .then(function(newUser) {
                $rootScope.newUser = true;
                $state.go('login');
            })
            .catch(function (err) {
                // console.log('err after all ', err)
                $scope.error = 'Invalid signup credentials.'
            });
    }
});