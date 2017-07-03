(function () {
        angular
        .module('loc8rApp')
        .directive('ratingStars', ratingStars);

    function ratingStars() {
        console.log("called rating stars");
        return {
            restrict: 'A',
            scope: {
                thisRating : '=rating'
            },
            templateUrl: '/common/directives/ratingStars/ratingStars.template.html'
        };
    }
})();