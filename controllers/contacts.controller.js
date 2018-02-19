const User = require('../models/User');

exports.index = async (req, res) => {
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

exports.create = async (req, res) => {
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
