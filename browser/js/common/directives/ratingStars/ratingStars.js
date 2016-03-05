app.directive('ratingStars', function (RandomGreetings) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/ratingStars/ratingStars.html'
    };

});

app.directive('avgRatingStars', function (RandomGreetings) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/ratingStars/avgRatingStars.html'
    };

});