(function () {
        angular
        .module('loc8rApp')
        .directive('ratingStars', ratingStars);

    function ratingStars() {
        console.log("called rating stars");
        return {
            restrict: 'EA',
            scope: {
                thisRating : '=stars'
            },
            templateUrl: '/common/directives/ratingStars/ratingStars.template.html'
        };
    }
})();