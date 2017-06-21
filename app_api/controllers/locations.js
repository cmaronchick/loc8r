var mongoose = require('mongoose');
console.log("mongoose.models = " + mongoose.model.name);
var Loc = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}



/* QUERY URL FOR LOCATION */

var theEarth = (function() {
    var earthRadius = 6371; // km, miles is 3959
    var getDistanceFromRads = function(rads) {
        return parseFloat(rads *earthRadius);
    };

    var getRadsFromDistance = function(distance) {
        return parseFloat(distance / earthRadius);
    };

    return {
        getDistanceFromRads : getDistanceFromRads,
        getRadsFromDistance : getRadsFromDistance
    };
});

module.exports.locationsListByDistance = function (req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var max = 100000;
    if (req.query.max > 0) {
        max = req.query.max;
    }
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    var geoOptions = {
        spherical: true,
        maxDistance: theEarth.getRadsFromDistance(max),
        num: 10
    }
    if (!lng || !lat) {
        sendJsonResponse({
            "message": "lng and lat query parameters are required"
        });
        return;
    }
    Loc.geoNear(point, geoOptions, function(err, results, stats) {
        var locations = [];
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            results.forEach(function(doc) {
                locations.push({
                    disttance: theEarth.getDistanceFromRads(doc.dis),
                    name: doc.obj.name,
                    address: doc.obj.address,
                    rating: doc.obj.rating,
                    facilities: doc.obj.facilities,
                    _id: doc.obj._id
                });
            });
            sendJsonResponse(res, 200, locations);
        }
    });
}

module.exports.locationsCreate = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};

    // console.log("ObjectId('" + req.params.locationId + "')");
module.exports.locationsReadOne = function (req, res) {
    if (!req.params && req.pams.locationid) {
    Loc
        .findById(req.params.locationid)
        .exec(function(err, location) {
            if (!location) {
                sendJsonResponse(res, 404, {
                    "message": "locationid not found"
                });
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, location);
        });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No locationid in request"
        });
    }
};
module.exports.locationsUpdateOne = function (req, res) {};
module.exports.locationsDeleteOne = function (req, res) {};
