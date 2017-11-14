const User = require('../../models/userModel');

module.exports = async (req, res) => {
  // get the user
  const user = await User.findUserById(req.params.id);

  if (!user) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
    });
  }

  // send the user's contacts
  res.json({
    success: true,
    contacts: user.contacts,
  });
};
