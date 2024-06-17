// Import required modules
const express = require('express');
const router = express.Router();
const { subscribe } = require('../controllers/subscriberController');

// Define route for subscribing users
router.post('/subscribe', subscribe);

module.exports = router;
