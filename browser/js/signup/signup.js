app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup/:isChef',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state, $http, $stateParams) {

    $scope.log = function() {
        SignupFactory.signup()
    }
    $scope.successmessage = null;
    

    // console.log("stateparams:",$stateParams)

    $scope.signup = {};
    $scope.error = null;

    $scope.showChef = $stateParams.isChef;
    // console.log("is chef =",$scope.showChef)

    var postRoute;
    if($stateParams.showChef) {
        // console.log("inside if")
        postRoute = 'api/chefs';
    }
    else {
        // console.log("inside else")
        postRoute= 'api/users';
    }

    // $scope.isChef = function() {
    //     return false;
    // }

    $scope.sendsignup = function (signupInfo) {
        return $http.post(postRoute, signupInfo)
        .then(function(newUser) {
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
