const db = require("../config/db");
const ebookCar = (req, res) => {
    const { name, dealership, model } = req.body;
  
    const query = 'INSERT INTO booked_cars (user_name, dealership, car_model) VALUES (?, ?, ?)';
  db.query(query, [name, dealership, model], (err, result) => {
    if (err) {
      console.error('Error executing query:', err); // Log the specific error
      return res.status(500).json({ error: 'Failed to book car' });
    }

    res.json({ message: 'Car booked successfully!'});
  });
  };
  
  // Export the bookCar function
  module.exports = { ebookCar };