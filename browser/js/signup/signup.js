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
        console.log('hello. regular user signup')
        return $http.post('api/users', signupInfo)
        .then(function(newUser) {
                // $rootScope.newUser = true;
                // moved the logic to a state parameter rather than putting on rootscope
                $state.go('login',{
                    successmessage: 'Successful signup! Please log in.'
                });
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
    console.log("chef signup controller")

    $scope.log = function() {
        SignupFactory.signup()
    }
    $scope.successmessage = null;
    
    $scope.isChef = function() {
        return true;
    }

    $scope.cuisines = ['Italian','Indian','French', 'Mediterrenean', 'Brazilian', 'Thai','New American','Chinese','Japanese','Vietnamese','Mexican','Peruvian','Food truck','Sandwiches','Pub food', 'Spanish', 'Vegetarian', 'Pastry', 'Desserts'];

    $scope.signup = {};
    $scope.error = null;

    $scope.sendsignup = function (signupInfo) {
        // console.log('chef signup sendsignup',signupInfo)
        signupInfo.type="chef";
        return $http.post('api/chefs', signupInfo)
        .then(function(newUser) {
                $rootScope.newUser = true;
                $state.go('login',{
                  successmessage: 'Successful signup! Please log in.'
                });
            })
            .catch(function (err) {
                console.log('error', err)
                $scope.error = 'Invalid signup credentials.'
            });
    }
});