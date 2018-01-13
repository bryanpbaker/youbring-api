const User = require('../../models/userModel');

module.exports = async (req, res) => {
  // get the user
  const contacts = await User.fetchContacts(req.decodedToken.id);

  if (!contacts) {
    res.status(404).json({
      success: false,
      message: 'Contacts not found!',
    });
  }

  // send the user's contacts
  res.json({
    success: true,
    contacts,
  });
};
