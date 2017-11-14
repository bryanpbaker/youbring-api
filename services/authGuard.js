const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = async (req, res, next) => {
  // get the token from the authorization header
  const token = req.headers.authorization;

  if (token) {
    // verify the jwt
    jwt.verify(token, keys.jwtSecret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }

      if (req.params.id === decoded.id) {
        // add decoded token to req
        req.decodedToken = decoded;
        // move on
        next();
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'No token was provided!',
    });
  }
};
