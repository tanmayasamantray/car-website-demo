// testDriveController.test.js
const { scheduleTestDrive } = require('./testDriveController');
const db = require('../config/db');
const emailUtils = require('../utils/emailUtils');

jest.mock('../config/db');
jest.mock('../utils/emailUtils');

describe('scheduleTestDrive', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should schedule test drive successfully', async () => {
        const req = {
            body: {
                dealerId: 1,
                date: '2024-04-30',
                time: '15:00',
                carModel: 'Model X'
            },
            user: { userId: 1 }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockDealer = { id: 1, name: 'Dealer A' };
        const mockUser = { id: 1, name: 'User A', email: 'user@example.com' };

        db.query.mockImplementation((query, values, callback) => {
            if (query.startsWith('SELECT')) {
                if (query.includes('dealers')) {
                    callback(null, [mockDealer]);
                } else if (query.includes('registered_users')) {
                    callback(null, [mockUser]);
                }
            } else if (query.startsWith('INSERT')) {
                callback(null, {});
            }
        });

        await scheduleTestDrive(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Test drive scheduled successfully' });
        expect(emailUtils.sendEmail).toHaveBeenCalledWith(
            mockUser.email,
            'Test Drive Scheduled',
            `Dear ${mockUser.name}, \n\nYou have successfully scheduled a test drive for ${req.body.carModel} at ${mockDealer.name} on ${req.body.date} at ${req.body.time}.`
        );
    });

    test('should return error if dealer not found', async () => {
        const req = {
            body: {
                dealerId: 999, // non-existent dealer
                date: '2024-04-30',
                time: '15:00',
                carModel: 'Model X'
            },
            user: { userId: 1 }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        db.query.mockImplementation((query, values, callback) => {
            callback(null, []); // simulate empty result set for dealer
        });

        await scheduleTestDrive(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Dealer not found' });
    });

    test('should return error if user not found', async () => {
        const req = {
            body: {
                dealerId: 1,
                date: '2024-04-30',
                time: '15:00',
                carModel: 'Model X'
            },
            user: { userId: 999 } // non-existent user
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        db.query.mockImplementation((query, values, callback) => {
            callback(null, []); // simulate empty result set for user
        });

        await scheduleTestDrive(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Dealer not found' });
    });

    test('should return error if database query fails', async () => {
        const req = {
            body: {
                dealerId: 1,
                date: '2024-04-30',
                time: '15:00',
                carModel: 'Model X'
            },
            user: { userId: 1 }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        db.query.mockImplementation((query, values, callback) => {
            callback(new Error('Database error'));
        });

        await scheduleTestDrive(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error scheduling test drive' });
    });

    test('should return error if invalid date or time provided', async () => {
        const req = {
            body: {
                dealerId: 1,
                date: '2024-05-01', // Sunday
                time: '10:00', // before 11 am
                carModel: 'Model X'
            },
            user: { userId: 1 }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await scheduleTestDrive(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid date or time' });
    });
});
