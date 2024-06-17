// models/Car.js

const db = require('../config/db');

const createCarsTable = `
    CREATE TABLE IF NOT EXISTS cars_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        model VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL
    )
`;

db.query(createCarsTable, (err, result) => {
    if(err) throw err;
    console.log('Cars info table created or exists');
});

const getCarByModel = (model, callback) => {
    const query = 'SELECT * FROM cars_info WHERE model = ?';
    db.query(query, [model], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result[0]);
        }
    });
};

module.exports = { getCarByModel };
