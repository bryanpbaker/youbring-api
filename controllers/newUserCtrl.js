const User = require('../models/userModel');

module.exports = (req, res) => {
  User.createUser(new User({
    userId: 1,
    email: req.body.email,
    password: req.body.password,
  }))
    .then((param1) => {
      console.log('param1', param1);
    })
    .catch((error) => {
      console.error('Could not create user!', error);
    });
};
