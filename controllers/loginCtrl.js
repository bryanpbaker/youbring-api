const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const keys = require('../config/keys');

module.exports = async (req, res) => {
  // await the the user from findUserByEmail
  const user = await User.findUserByEmail(req.body.email);

  if (user) {
    // compare the user's password to the hashed password from the db
    if (bcrypt.compareSync(req.body.password, user.password)) {
      req.token = jwt.sign({
        // sign a token with the user's id
        id: user.userId,
      }, keys.jwtSecret, {
        // expires in 48 hours
        expiresIn: 1000 * 60 * 60 * 48,
      });

      // send a success, token and user object
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

    // if the password doesn't match, let them know
    res.status(401).send('Incorrect password.');
  } else {
    // if no user is found, let them know
    res.status(404).send('User not found!');
  }
};
