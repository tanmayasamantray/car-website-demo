// routes/testDriveRoutes.js

const express = require('express');
const router = express.Router();
const { scheduleTestDrive } = require('../controllers/testDriveController');
const { authenticateToken } = require('../middleware/auth');

// Route to schedule test drive
router.post('/schedule-test-drive', scheduleTestDrive);

module.exports = router;
