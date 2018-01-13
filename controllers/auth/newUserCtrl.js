const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');
const User = require('../../models/userModel');

module.exports = async (req, res) => {
  // create a user
  const user = await User.createUser(new User({
    isSocialUser: false,
    userId: uniqid(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    contacts: [],
    events: [],
  }));

  if (user) {
    // if we are able to create a new User, sign a token...
    req.token = jwt.sign({
      id: user.userId,
    }, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 48,
    });

    // ...send the token and some user props
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
  } else {
    res.status(409).json({
      success: false,
      message: 'A user with this email address already exists!',
    });
  }
};
