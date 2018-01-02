const User = require('../../models/userModel');

module.exports = async (req, res) => {
  const user = await User.findUserById(req.params.id);
  const { newEvent } = req.body;

  if (user) {
    user.events.addToSet(newEvent);
    user.save();
    res.json({
      success: true,
      profile: {
        userId: user.userId,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        events: user.events,
        contact: user.contacts,
      },
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found!',
    });
  }
};
