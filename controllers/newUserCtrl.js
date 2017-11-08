const User = require('../models/userModel');

module.exports = (req, res) => {
  User.createUser(new User({
    userId: 1,
    email: req.body.email,
    password: req.body.password,
  }), (err, user) => {
    console.error(err);
    console.log('user', user);
  });
};
