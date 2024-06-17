//models/Users.js

const db = require('../config/db');

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS registered_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    state VARCHAR(255),
    city VARCHAR(255)
  )
`;
const createGoogleUserTable = `
    CREATE TABLE IF NOT EXISTS  google_user(
      id INT AUTO_INCREMENT PRIMARY KEY,
      google_id VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    )
`

db.query(createUsersTable, (err, result) => {
  if (err) throw err;
  console.log('Registered users table created or already exists');
});
db.query(createGoogleUserTable, (err, result) => {
  if (err) throw err;
  console.log('Google users table created or already exists');
});

module.exports = db;