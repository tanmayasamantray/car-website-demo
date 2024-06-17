// // controllers/testDriveController.js

// const dbOperations = require('../utils/dbOperations');
// const emailUtils = require('../utils/emailUtils');
// const { isValidDateTime } = require('../utils/dateTimeUtils');

// const scheduleTestDrive = async (req, res) => {
//     const { dealerId, date, time, carModel } = req.body;
//     const userId = req.user.userId;

//     if (!isValidDateTime(date, time)) {
//         return res.status(400).json({ error: 'Invalid date or time' });
//     }

//     try {
//         const dealer = await dbOperations.getById('dealers', dealerId);
//         if (!dealer) {
//             return res.status(404).json({ error: 'Dealer not found' });
//         }

//         const user = await dbOperations.getById('registered_users', userId);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         await dbOperations.insertRecord('test_drives', {
//             user_id: userId,
//             dealer_id: dealerId,
//             date,
//             time,
//             car_model: carModel
//         });

//         const emailContent = `Dear ${user.name}, \n\nYou have successfully scheduled a test drive for ${carModel} at ${dealer.name} on ${date} at ${time}.`;
//         emailUtils.sendEmail(user.email, 'Test Drive Scheduled', emailContent);

//         res.status(201).json({ message: 'Test drive scheduled successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error scheduling test drive' });
//     }
// };

// module.exports = { scheduleTestDrive };


const dbOperations = require('../utils/dbOperations');
const db = require('../config/db');
const scheduleTestDrive = async (req, res) => {
    const { name, email, phone, preferredModel, selectTransmission, testDrive, preferredTime,selectedDate } = req.body;

    if (new Date(selectedDate).getDay() === 0) {
        console.log('Test drives are not available on Sundays:', selectedDate);
        return res.status(400).json({ error: 'Test drives are not available on Sundays' });
    }
        const query = 'INSERT INTO test_drives(name, email, phone, preferredModel,selectTransmission, testDrive, preferredTime, selectedDate) VALUES (?,?,?,?,?,?,?,?)'
        db.query(query, [name, email, phone, preferredModel, selectTransmission, testDrive,preferredTime, selectedDate], (err, result) => {
            if (err) {
              console.error('Error executing query:', err); // Log the specific error
              return res.status(500).json({ error: 'Failed to book test Drive' });
            }
        
            res.json({ message: 'Car booked successfully!'});
          });
};

module.exports = { scheduleTestDrive };
