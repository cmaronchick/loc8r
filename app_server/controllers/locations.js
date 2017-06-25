var request = require('request');
var apiOptions = {
    server : "http://localhost",
    PORT : "3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://glacial-beach-36022.herokuapp.com/";
    apiOptions.PORT = process.env.PORT;

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

var _formatDistance = function(distance) {
    var numDistance, unit;
    // if (distance && isNumeric(distance)) {
        if (distance > 1) {
            numDistance = parseFloat(distance).toFixed(1);
            unit = 'km';
        } else {
            numDistance = parseInt(distance * 1000,10);
            unit = 'm';
        }
        return numDistance + unit;
    // } else {
    //     return "?";
    // }
}

var _showError = function (req, res, statusCode) {
    var title, content;
    if (statusCode === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else {
        title = statusCode + ", something went wrong.";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(statusCode);
    res.render('generic-text', {
        title: title,
        content: content
    });
};

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
            maxDistance: 1000
        }
    };
    console.log("requestOptions = ", requestOptions);
    request(
        requestOptions,
        function(err, response, body) {
            var i, data;
            data = body;
            if (response.statusCode === 200 && data.length) {
                for (i=0; i < data.length; i++) {
                    data[i].distance = _formatDistance(data[i].distance);
                }
            }
            renderHomePage(req, res, data);
        }
    );
};

/* Get Location Function */
var getLocationInfo = function (req, res, callback) {

    var requestOptions, path;
    path = "/api/locations/" + req.params.locationid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            if (response.statusCode === 200) {
                var data = body;
                console.log("data = ", data);
                if (data.coords && data.coords.length > 0) {
                    data.coords = {
                        lng: body.coords[0],
                        lat: body.coords[1]
                    };
                }
                callback(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    )
};

/* Render Detail Page */

var renderDetailPage = function (req, res, locDetail) {
    res.render('location-info', {
        title: locDetail.name,
        pageHeader: {title: locDetail.name},
        address: locDetail.address,
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: locDetail
    });
}

/* GET 'Location Info' Page */

module.exports.locationInfo = function (req, res) {
    getLocationInfo(req, res, function(req, res, responseData) {
        renderDetailPage(req, res, responseData);
    });
};


/* RENDER Review Page */
var renderReviewPage = function(req, res, locDetail) {
    res.render('location-review-form', {
        title: 'Review ' + locDetail.name + ' on Loc8r',
        location: locDetail,
        error: req.query.formError
    });
}

/* GET 'Add review' Page */

module.exports.addReview = function (req, res) {
    getLocationInfo(req, res, function(req, res, responseData) {
        renderReviewPage(req, res, responseData);
    });
};

/* GET 'Add review' Page */

module.exports.doAddReview = function (req, res) {
    var requestOptions, path, locationid, postdata;
    locationid = req.params.locationid;
    path = "/api/locations/" + locationid + "/reviews";
    postdata = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };
    if (!postdata.author || !postdata.rating || !postdata.reviewText) {
        res.redirect('/location/' + locationid + '/review/new?formError=val');
    } else {
        console.log("requestOptions = ",requestOptions);
        request(
            requestOptions,
            function(err, response, body) {
                console.log("statusCode = ", response.statusCode);
                console.log("body.name = ", body.name);
                if (response.statusCode === 201) {
                    res.redirect('/location/' + locationid);
                } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
                    res.redirect('/location/' + locationid + '/review/new?formError=val');
                } else {
                    _showError(req, res, response.statusCode);
                }
            }
        )
    }
};

/* GET 'About' Page */

module.exports.about = function (req, res) {
    res.render('generic-text', {title: 'About'});
};

