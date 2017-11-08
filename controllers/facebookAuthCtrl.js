const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res) => {
  req.token = jwt.sign({
    id: req.user.facebookId,
  }, keys.jwtSecret, {
    expiresIn: 1000 * 60 * 60 * 48,
  });

  res.json({ token: req.token, user: req.user });
};
