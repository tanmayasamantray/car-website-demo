//routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, googleRegister, loginUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/OAuth', googleRegister);
router.post('/login', loginUser);

module.exports = router;