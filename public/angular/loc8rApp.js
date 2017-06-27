angular.module('loc8rApp', []);

var _isNumeric = function (n) {
    return !isNaN(parseFloat(n) && isFinite(n))
};

var formatDistance = function() {
    return function(distance) {
        var numDistance, unit;
        if (distance && _isNumeric(distance)) {
            if (distance > 1) {
                numDistance = parseFloat(distance).toFixed(1);
                unit = 'km';
            } else {
                numDistance = parseInt(distance * 1000,10);
                unit = 'm';
            }
            return numDistance + unit;
        } else {
            return "?";
        }
    };
};

var locationsListCtrl = function ($scope) {
    $scope.message = "Check your location";
    $scope.data = {
        locations: [{
            name: 'Strickland Propane',
            address: '123 Rainy Street, Arlen, TX, 12345',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '0.296456',
            _id: '594837f9adcd36a01bfc957e'
        },
        {
            name: 'Thatherton Fuels',
            address: '123 Thatherton Street, McMaynerberry, TX, 12346',
            rating: 1,
            facilities: ['Hot drinks'],
            distance: '0.296457',
            _id: '59483869adcd36a01bfc957f'
        }]
    }
};

var ratingStars = function () {
    return {
        scope: {
            thisRating: '=rating'
        },
        templateUrl: '/angular/rating-stars.html'
    };
};

angular
    .module('loc8rApp')
    .controller('locationsListCtrl', locationsListCtrl)
    .filter('formatDistance', formatDistance)
    .directive('ratingStars', ratingStars);