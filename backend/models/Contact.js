// models/Contact.js

const db = require('../config/db');

const createContactFormsTable = `
    CREATE TABLE IF NOT EXISTS contact_forms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT
    )
`;


db.query(createContactFormsTable, (err, result) => {
    if (err) throw err;
    console.log('Contact forms table created or exists');
});

module.exports = db;