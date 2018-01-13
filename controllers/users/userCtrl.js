const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

module.exports = async (req, res) => {
  // find the suer with the given id
  const user = await User.findUserById(req.params.id);

  // if there's no user, send a 404
  if (!user) {
    res.status(404).json({
      success: false,
      message: 'No user found!',
    });
  }

  // if there is a user, send the user and their token
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
};
