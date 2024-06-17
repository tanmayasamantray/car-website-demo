const { ebookCar } = require('../controllers/bookingController');
const db = require('../config/db');
const emailUtils = require('../utils/emailUtils');

jest.mock('../config/db');
jest.mock('../utils/emailUtils');

describe('ebookCar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should e-book car successfully', async () => {
    const req = {
      body: {
        dealerName: 'Dealer X',
        carModel: 'Model Y'
      },
      user: {
        id: 1
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Mock database queries
    db.query.mockImplementation((query, values, callback) => {
      if (query.includes('registered_users')) {
        callback(null, [{ name: 'John Doe', email: 'john@example.com' }]);
      } else if (query.includes('dealers')) {
        callback(null, [{ id: 1, name: 'Dealer X', address: '123 Main St' }]);
      } else if (query.includes('cars_info')) {
        callback(null, [{ model: 'Model Y', price: 20000 }]);
      } else if (query.includes('booked_cars')) {
        callback(null, {});
      }
    });

    // Mock sending email
    emailUtils.sendEmail.mockResolvedValue();

    await ebookCar(req, res);

    expect(db.query).toHaveBeenCalledTimes(4);
    expect(emailUtils.sendEmail).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Car e-booked successfully' });
  });

  test('should handle error during e-booking car', async () => {
    const req = {
      body: {
        dealerName: 'Dealer X',
        carModel: 'Model Y'
      },
      user: {
        id: 1
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockError = new Error('Database error');

    // Mock database queries to simulate error
    db.query.mockImplementation((query, values, callback) => {
      callback(mockError);
    });

    await ebookCar(req, res);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(emailUtils.sendEmail).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error e-booking car' });
  });
});