const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res) => {
  req.token = jwt.sign({
    id: req.user.userId,
  }, keys.jwtSecret, {
    expiresIn: 1000 * 60 * 60 * 48,
  });

  res.json({
    token: req.token,
    user: {
      userId: req.user.userId,
      email: req.user.email,
      events: req.user.events,
      contact: req.user.contacts,
    },
  });
};
