//models/Dealer.js

const db = require('../config/db');

const findNearestDealers = (userLocation, callback) => {
    const { latitude, longitude } = userLocation;
    const query =
        'SELECT *, SQRT(POW(69.1 * (latitude - ?), 2) + POW(69.1 * (? - longitude) * COS(latitude / 57.3), 2)) AS distance FROM dealers ORDER BY distance LIMIT 3';

    db.query(query, [latitude, longitude], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            const sortedDealers = results.sort((a, b) => a.distance - b.distance);
            callback(null, sortedDealers);
        }
    });
};

module.exports = { findNearestDealers };