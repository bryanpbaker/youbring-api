const User = require('../../models/userModel');

module.exports = async (req, res) => {
  const user = await User.findUserById(req.params.id);
  const { newEvent } = req.body;

  if (user) {
    user.events.addToSet(newEvent);
    user.save();
    res.json({
      success: true,
      events: user.events,
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found!',
    });
  }
};
