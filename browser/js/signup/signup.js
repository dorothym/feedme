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

    $scope.sendsignup = function (signupInfo) {
        console.log('hello')
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