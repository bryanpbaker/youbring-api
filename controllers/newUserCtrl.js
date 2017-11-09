const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/userModel');

module.exports = (req, res) => {
  User.createUser(new User({
    userId: 1,
    email: req.body.email,
    password: req.body.password,
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
