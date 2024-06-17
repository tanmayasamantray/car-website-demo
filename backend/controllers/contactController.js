//routes/contactController.js

const db = require('../config/db');

const submitContactForm = async (req, res) => {
    const { firstName, lastName, email, subject, message } = req.body;
    try {
        // Insert contact form submission into database
        const query = 'INSERT INTO contact_forms (first_name, last_name, email, subject, message) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [firstName, lastName, email, subject, message], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error submitting contact form' });
            }

            res.status(201).json({ message: 'Contact form submitted successfully' });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { submitContactForm };