app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl',
        params: {
            'successmessage': ''
          }
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state,$stateParams) {

    if($stateParams) {
        $scope.successmessage = $stateParams.successmessage;
        // console.log("success message", $scope.successmessage)
    };

    $scope.login = {};
    $scope.error = null;
  
    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});