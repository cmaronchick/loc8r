var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.register = function (req, res) {
    if (!req.body.name || !req.body.password || !req.body.email) {
        sendJSONResponse(res, 400, {
            "message": "All fields required."
        });
        return;
    }

    var user = new User();

    console.log('User created')
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    console.log("Password set");

    user.save(function (err) {
        var token;

        if (err) {
            sendJSONResponse(res, 404, err);
        } else {
            token = user.generateJWT();
            sendJSONResponse(res, 200, {
                "token": token
            });
        }
    });
    console.log("User saved");
}

module.exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) {
        sendJSONResponse(res, 400, {
            "message": "E-mail and password required."
        });
        return;
    }

    passport.authenticate('local', function(err, user, info) {
        var token;

        if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        if (user) {
            token = user.generateJWT();
            sendJSONResponse(res, 200, {
                "token": token
            });
        } else {
            sendJSONResponse(res, 401, info);
        }
    })(req, res);
};