// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');

//Route to submit contact form
router.post('/submit-contact-form', submitContactForm);

module.exports = router;