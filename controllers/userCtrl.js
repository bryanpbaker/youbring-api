const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const keys = require('../config/keys');

module.exports = (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, keys.jwtSecret, async (err, decoded) => {
    const user = await User.findUserById(decoded.id);
    console.log(user);
  });
};
