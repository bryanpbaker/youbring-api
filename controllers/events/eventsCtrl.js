const User = require('../../models/userModel');

module.exports = async (req, res) => {
  // get the user
  const events = await User.fetchEvents(req.decodedToken.id);

  if (!events) {
    res.status(404).json({
      success: false,
      message: 'Events not found!',
    });
  }

  // send the user's events
  res.json({
    success: true,
    events,
  });
};
