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

var locationsListCtrl = function ($scope, loc8rData, geolocation) {
    var data;
    $scope.message = "Checking your location ...";
    $scope.getData = function(position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
        $scope.lat = lat;
        $scope.lng = lng;
        $scope.message = "Searching for nearby places ...";
        loc8rData.locationByCoords(lat, lng)
            .then(function(success) {
                data = success.data;
                $scope.data = { locations : data };
                $scope.message = data.length > 0 ? "" : "No locations found";
            },
            function(error) {
                console.log(error);
                $scope.message = "Sorry, something's gone wrong."
            });
    };

    $scope.showError = function(error) {
        $scope.$apply(function () {
            $scope.message = error.message;
        });
    };

    $scope.noGeo = function() {
        $scope.$apply(function() {
            $scope.message = "Geolocation not supported by this browser.";
        });
    };

    geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};

// var ratingStars = function () {
//     return {
//         scope: {
//             thisRating: '=rating'
//         },
//         templateUrl: '/angular/rating-stars.html'
//     };
// };

var loc8rData = function($http) {
    var locationByCoords = function(lat, lng) {
        return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '');
    }
    return {
        locationByCoords : locationByCoords
    }
};

var geoLocation = function() {
    var getPosition = function (cbSuccess, cbError, cbNoGeo) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
        } else {
            cbNoGeo();
        }
    };
    return {
        getPosition : getPosition
    };
};


    // .directive('ratingStars', ratingStars)

angular
    .module('loc8rApp')
    .controller('locationsListCtrl', locationsListCtrl)
    .filter('formatDistance', formatDistance)
    .service('loc8rData', loc8rData)
    .service('geolocation', geoLocation);