// // models/ShowroomVisitor.js

// const db = require('../config/db');

// const createShowroomVisitorsTable = `
//     CREATE TABLE IF NOT EXISTS showroom_visitors (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255),
//         dealer_name ,
//         date DATE NOT NULL,
//         time TIME NOT NULL
//     )
// `;

// db.query(createShowroomVisitorsTable, (err, result) => {
//     if(err) throw err;
//     console.log('Showroom visitors table created or exists');
// });

// const bookShowroomVisit = (userId, dealerId, date, time, callback) => {
//     const query = 'INSERT INTO showroom_visitors (name, dealer_name, date, time) VALUES (?, ?, ?, ?)';
//     db.query(query, [userName, dealerId, date, time], (err, result) => {
//         if (err) {
//             callback(err, null);
//         } else {
//             callback(null, result);
//         }
//     });
// };

// module.exports = { bookShowroomVisit };
