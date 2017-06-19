/* GET 'home' page */
module.exports.homeList = function(req, res) {
    res.render('locations-list', {
        title: 'Find places to work with Loc8r',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        locations: [{
            name: 'Home',
            address: '123 Rainy Street, Arlen, 12345',
            facilities: ['Hot drinks', 'Food', 'Premium Wifi'],
            distance: '200m',
            rating: 5
        },
        {
            name: 'Strickland Propane',
            address: '456 Strickland Ave., Arlen, 12345',
            facilities: ['Hot drinks', 'Premium Wifi'],
            distance: '5km',
            rating: 3
        },
        {
            name: 'Tom Landry Middle School',
            address: '1 Tom Landry Drive, McMaynerberry, 23456',
            facilities: ['Premium Wifi'],
            distance: '20km',
            rating: 4
        }]
    });
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