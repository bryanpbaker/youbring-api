const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async (req, res) => {
  const user = await User.findUserById(req.params.id);

  if (!user) {
    res.status(404).json({
      success: false,
      message: 'No user found!',
    });
  }

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
};
