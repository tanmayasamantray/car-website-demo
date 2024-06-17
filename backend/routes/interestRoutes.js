// routes/interestRoutes.js

const express = require('express');
const router = express.Router();
const { registerInterest } = require('../controllers/interestController');
const { authenticateToken } = require('../middleware/auth');

// Route to register interest
router.post('/interest', authenticateToken, registerInterest);

module.exports = router;
