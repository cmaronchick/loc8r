var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://glacial-beach-36022";
};
var requestOptions = {
    url: apiOptions.server
}


/* Render the Home Page */
var renderHomePage = function (req, res, responseBody) {
    var message;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) {
        message = "No places found nearby";
        }
    console.log("responseBody = ", responseBody);
    }
    res.render('locations-list', {
        title: 'Loc8r - Find a place to work with WiFi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: responseBody,
        message: message
    });
}

/* GET 'home' page */
module.exports.homeList = function(req, res) {
    var requestOptions, path;
    path = "/api/locations";
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
        qs: {
            lng : -0.7992599,
            lat : 51.378091,
            maxDistance: 20
        }
    };
    console.log("requestOptions = ", requestOptions);
    request(
        requestOptions,
        function(err, response, body) {
            renderHomePage(req, res, body);
        }
    );
};

/* GET 'Location Info' Page */
module.exports.locationInfo = function (req, res) {
    res.render('location-info', {
        title: 'Home',
        address: '123 Rainy Street, Arlen, 12345',
        openingHours: [{
            day: 'Monday',
            openHour: ''
        }]
    });
};

/* GET 'Add review' Page */

module.exports.addReview = function (req, res) {
    res.render('location-review-form', {title: 'Add review'});
};

/* GET 'About' Page */

module.exports.about = function (req, res) {
    res.render('generic-text', {title: 'About'});
};

