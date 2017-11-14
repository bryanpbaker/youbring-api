const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const keys = require('../config/keys');

module.exports = async (req, res) => {
  const user = await User.findUserByEmail(req.body.email);
  console.log(req.body);

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      req.token = jwt.sign({
        id: user.userId,
      }, keys.jwtSecret, {
        expiresIn: 1000 * 60 * 60 * 48,
      });

      res.json({
        success: true,
        token: req.token,
        user: {
          userId: user.userId,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          events: user.events,
          contact: user.contacts,
        },
      });
    }

    res.status(401).send('Incorrect password.');
  } else {
    res.status(404).send('User not found!');
  }
};
