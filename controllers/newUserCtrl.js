const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const uniqid = require('uniqid');
const User = require('../models/userModel');

module.exports = (req, res) => {
  User.createUser(new User({
    userId: uniqid(),
    first_name: '',
    last_name: '',
    email: req.body.email,
    password: req.body.password,
    contacts: [],
    events: [],
  }))
    .then((user) => {
      req.token = jwt.sign({
        id: user.userId,
      }, keys.jwtSecret, {
        expiresIn: 1000 * 60 * 60 * 48,
      });

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
    })
    .catch((error) => {
      res.status(409).send(error.errmsg);
    });
};
