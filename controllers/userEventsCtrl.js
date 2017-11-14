const User = require('../models/userModel');

module.exports = async (req, res) => {
  // get the user
  const user = await User.findUserById(req.params.id);

  // send the user's events
  res.json({
    success: true,
    events: user.events,
  });
};
