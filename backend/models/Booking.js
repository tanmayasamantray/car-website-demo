// models/Booking.js

const db = require('../config/db');

const createBookedCarsTable = `
    CREATE TABLE IF NOT EXISTS booked_cars (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        dealership VARCHAR(255) NOT NULL,
        car_model VARCHAR(255) NOT NULL
    )
`;

db.query(createBookedCarsTable, (err, result) => {
    if(err) throw err;
    console.log('Booked cars table created or exists');
});
