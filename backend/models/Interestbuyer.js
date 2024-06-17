//models/Interestbuyer.js

const db = require('../config/db');

const createInterestedBuyers = `CREATE TABLE IF NOT EXISTS interested_buyers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    car_model VARCHAR(255) NOT NULL
)`;

db.query(createInterestedBuyers, (err, result) => {
    if(err) throw err;
    console.log('Interested buyers table created or exists');
});

module.exports = createInterestedBuyers;