const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const keys = require('../config/keys');

module.exports = (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, keys.jwtSecret, async (err, decodedToken) => {
    if (err) {
      res.send(err.message);
    }

    const user = await User.findUserById(decodedToken.id);

    if (!user) {
      res.send('No user found!');
    }

    res.json({
      user: {
        userId: user.userId,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        events: user.events,
        contact: user.contacts,
      },
    });
  });
};
