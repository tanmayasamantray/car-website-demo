// Import the database connection
const db = require('../config/db');

// Model function to insert a new subscriber
const addSubscriber = (email) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO subscribers (email) VALUES (?)';
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error('error', err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { addSubscriber };
