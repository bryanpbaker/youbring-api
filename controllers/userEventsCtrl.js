const User = require('../models/userModel');

module.exports = async (req, res) => {
  const user = await User.findUserById(req.params.id);

  res.json({
    success: true,
    events: user.events,
  });
};
