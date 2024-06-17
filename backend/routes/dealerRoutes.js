//routes/dealerRoutes.js

const express = require('express');
const router = express.Router();
const { findNearestDealers } = require('../models/Dealer');

// Route to retrieve nearest dealers
router.get('/dealers', (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const userLocation = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };

    findNearestDealers(userLocation, (err, dealers) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.json(dealers);
    });
});

module.exports = router;