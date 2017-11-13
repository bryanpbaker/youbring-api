const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, keys.jwtSecret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }

      req.decodedToken = decoded;
      next();
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'No token was provided!',
    });
  }
};
