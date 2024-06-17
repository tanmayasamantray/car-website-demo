// Import the subscriber model
const Subscriber = require('../models/Subscriber');

// Controller function to handle subscription requests
const subscribe = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    await Subscriber.addSubscriber(email);
    res.status(200).json({ message: 'User subscribed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to subscribe user' });
  }
};

module.exports = { subscribe };
