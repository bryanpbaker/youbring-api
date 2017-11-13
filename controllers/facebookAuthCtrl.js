const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res) => {
  // sign a token
  req.token = jwt.sign({
    id: req.user.userId,
  }, keys.jwtSecret, {
    expiresIn: 1000 * 60 * 60 * 48,
  });

  // send the token and some user properties
  res.json({
    success: true,
    token: req.token,
    user: {
      userId: req.user.userId,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      events: req.user.events,
      contact: req.user.contacts,
    },
  });
};
