const emailUtils = require('../utils/emailUtils');
const db = require('../config/db');
const { isValidDateTime } = require('../utils/dateTimeUtils');

const bookShowroomVisit = async (req, res) => {
    const {name, dealer_name, date, time} = req.body;
    const query='INSERT INTO showroom_visitors(name, dealer_name, date, time) VALUES (?, ?, ?, ?)';
    db.query(query, [name, dealer_name, date, time], (err, result) =>{
        if(err){
            console.error('Error executing query:', err); // Log the specific error
            return res.status(500).json({ error: 'Failed to book showroom visit'});
        }
        res.json({message: 'Showroom visit booked successfully'})
    });
};

module.exports = { bookShowroomVisit };
