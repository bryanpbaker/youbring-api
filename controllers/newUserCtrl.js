const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const uniqid = require('uniqid');
const User = require('../models/userModel');

module.exports = async (req, res) => {
  const user = await User.createUser(new User({
    userId: uniqid(),
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    contacts: [],
    events: [],
  }));

  if (user) {
    // if we are able to create a new User, sign a token...
    req.token = jwt.sign({
      id: user.userId,
    }, keys.jwtSecret, {
      expiresIn: 1000 * 60 * 60 * 48,
    });

    // ...send the token and some user props
    res.json({
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
  } else {
    res.status(409).send('User with this email already exists!');
  }
};
