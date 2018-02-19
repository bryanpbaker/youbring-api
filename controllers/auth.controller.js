const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.emailAuth = async (req, res) => {
  // await the the user from findUserByEmail
  const user = await User.findUserByEmail(req.body.email);

  if (user) {
    // compare the user's password to the hashed password from the db
    if (bcrypt.compareSync(req.body.password, user.password)) {
      req.token = jwt.sign({
        // sign a token with the user's id
        id: user.userId,
      }, process.env.JWT_SECRET, {
        // expires in 48 hours
        expiresIn: 1000 * 60 * 60 * 48,
      });

      // send a success, token and user object
      res.json({
        success: true,
        token: req.token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          events: user.events,
          contact: user.contacts,
        },
      });
    }

    // if the password doesn't match, let them know
    res.status(401).json({
      success: false,
      message: 'Incorrect password',
    });
  } else {
    // if no user is found, let them know
    res.status(404).json({
      success: false,
      message: 'User not found!',
    });
  }
};

exports.facebookAuth = (req, res) => {
  // sign a token
  req.token = jwt.sign({
    id: req.user.userId,
  }, process.env.JWT_SECRET, {
    expiresIn: 1000 * 60 * 60 * 48,
  });

  // send the token and some user properties
  res.json({
    success: true,
    token: req.token,
    user: {
      userId: req.user.userId,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      events: req.user.events,
      contact: req.user.contacts,
    },
  });
};
