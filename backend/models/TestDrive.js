// models/TestDrive.js

const db = require('../config/db');

const createTestDrivesTable = `
    CREATE TABLE IF NOT EXISTS test_drives (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name varchar(255),
        email varchar(255),
        phone int,
        preferredModel varchar(255),
        selectTransmission varchar(255),
        testDrive varchar(255),
        preferredTime time,
        selectedDate date
    )
`;

db.query(createTestDrivesTable, (err, result) => {
    if (err) throw err;
    console.log('Test drives table created or exists');
});

const scheduleTestDrive = (userId, dealerId, date, time, carModel, callback) => {
    const query = 'INSERT INTO test_drives (name, email, phone, preferredModel, selectedTransmission, testDrive, preferredTime, selectedDate) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [userId, dealerId, date, time, carModel], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

module.exports = { scheduleTestDrive };