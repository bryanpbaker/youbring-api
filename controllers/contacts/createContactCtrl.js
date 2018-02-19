const User = require('../../models/User');

module.exports = async (req, res) => {
  const user = await User.findUserById(req.decodedToken.id);
  const { newContact } = req.body;

  if (user) {
    user.contacts.addToSet(newContact);
    user.save();
    res.json({
      success: true,
      contacts: user.contacts,
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found!',
    });
  }
};
